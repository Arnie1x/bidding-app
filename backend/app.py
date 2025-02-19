from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta, timezone
import os

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Database and schema imports
import sys
sys.path.append('/home/arnie/Documents/bidding-app')
from backend.database import Database
from backend.schema import User, Admin, Product, Bid

# App setup
app = FastAPI()

# Configure CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Initialize database
db = Database(os.getenv("DATABASE_URL"))
db.create_tables()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Secret key
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")

# OAuth2 setup
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Helper functions
def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"iat": datetime.now(timezone.utc), "exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(lambda: db.Session())):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_email = payload["user"]["email"] or None
        if user_email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# Models
class UserLogin(BaseModel):
    email: str
    password: str

class UserSignUp(BaseModel):
    email: str
    password: str
    name: str
    
class PlaceBid(BaseModel):
    product_id: int
    bid_amount: int
    
class AdminCreate(BaseModel):
    email: str

class ProductCreate(BaseModel):
    name: str
    description: str
    starting_price: float
    bidding_end_time: datetime

# Routes
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(lambda: db.Session())):
    print(form_data)
    user = db.query(User).filter(User.email == form_data.username).first()
    admin = db.query(Admin).filter(Admin.user_id == user.user_id).first()
    if admin:
        admin_id = admin.admin_id
    else:
        admin_id = None
    if not user or not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_access_token({"user": {"user_id": user.user_id, "admin_id" : admin_id, "name": user.name, "email": user.email}})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/refresh-token")
async def refresh_token(token: str = Depends(oauth2_scheme), db: Session = Depends(lambda: db.Session())):
    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    user = db.query(User).filter(User.email == payload["user"]["email"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    new_token = create_access_token({"user": {"user_id": user.user_id, "admin_id" : payload["user"]["admin_id"], "name": user.name, "email": user.email}})
    return {"access_token": new_token, "token_type": "bearer"}

@app.post("/signup")
async def signup(user: UserSignUp, db: Session = Depends(lambda: db.Session())):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already in use")
    hashed_password = pwd_context.hash(user.password)
    new_user = User(email=user.email, password=hashed_password, name=user.name)
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

@app.get("/user/{email}")
async def get_user(email: str, db: Session = Depends(lambda: db.Session())):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/add-admin")
async def create_admin(admin: AdminCreate, db: Session = Depends(lambda: db.Session()), current_user: User = Depends(get_current_user)):
    # if not current_user.is_admin:
    #     raise HTTPException(status_code=403, detail="Only admins can create new admins")
    existing_user = db.query(User).filter(User.email == admin.email).first()
    existing_admin = db.query(Admin).filter(Admin.user_id == existing_user.user_id).first()
    if existing_admin:
        raise HTTPException(status_code=400, detail="User is already an admin")
    user_to_admin = db.query(User).filter(User.email == admin.email).first()
    new_admin = Admin(user=user_to_admin)
    db.add(new_admin)
    db.commit()
    return {"message": "Admin created successfully"}

@app.post("/add-product")
async def add_product(product: ProductCreate, db: Session = Depends(lambda: db.Session()), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can add new products")
    existing_admin = db.query(Admin).filter(Admin.user_id == current_user.user_id).first()
    
    new_product = Product(
        name=product.name,
        description=product.description,
        starting_price=product.starting_price,
        created_by=existing_admin.admin_id,
        bidding_end_time=product.bidding_end_time
    )
    db.add(new_product)
    db.commit()
    return {"message": "Product added successfully"}

@app.get("/products")
async def list_products(db: Session = Depends(lambda: db.Session())):
    products = db.query(Product).order_by(Product.bidding_end_time.desc()).all()
    for product in products:
        highest_bid = db.query(func.max(Bid.amount)).filter(Bid.product_id == product.product_id).scalar()
        if not highest_bid:
            highest_bid = product.starting_price
        product.highest_bid = highest_bid
    return products

@app.get("/products/bids")
async def get_products_with_bids(db: Session = Depends(lambda: db.Session()), current_user: User = Depends(get_current_user)):
    # Fetch all bids placed by the current user
    user_bids = db.query(Bid).filter(Bid.user_id == current_user.user_id).order_by(Bid.bid_id.desc()).all()
    
    # Filter out older bids for a product and only leave the latest bid by that user for a specific product
    latest_bids = {}
    for bid in user_bids:
        if bid.product_id not in latest_bids or bid.bid_id > latest_bids[bid.product_id].bid_id:
            latest_bids[bid.product_id] = bid
    
    products_with_bids = []
    for product_id, bid in latest_bids.items():
        product = db.query(Product).filter(Product.product_id == product_id).first()
        highest_bid = db.query(func.max(Bid.amount)).filter(Bid.product_id == product_id).scalar()
        if not highest_bid:
            highest_bid = product.starting_price
        
        product_data = {
            **product.__dict__,
            "highest_bid": highest_bid,
            "user_bid_amount": bid.amount,
        }
        products_with_bids.append(product_data)
    
    return products_with_bids


@app.get("/product/{product_id}")
async def get_product(product_id: int, db: Session = Depends(lambda: db.Session())):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    highest_bid = db.query(func.max(Bid.amount)).filter(Bid.product_id == product_id).scalar()
    if not highest_bid:
        highest_bid = product.starting_price
    return {**product.__dict__, "highest_bid": highest_bid}

@app.delete("/product/{product_id}")
async def delete_product(product_id: int, db: Session = Depends(lambda: db.Session()), current_user: User = Depends(get_current_user)):
    print(product_id)
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can delete products")
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}

# @app.get("/product/{product_id}/bids")
# async def list_bids(product_id: int, db: Session = Depends(lambda: db.Session())):
#     product = db.query(Product).filter(Product.product_id == product_id).first()
#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")
#     bids = db.query(Bid).filter(Bid.product_id == product_id).order_by(Bid.amount.desc()).all()
#     return bids


@app.post("/product/{product_id}/bid")
async def place_bid(bid: PlaceBid, db: Session = Depends(lambda: db.Session()), current_user: User = Depends(get_current_user)):
    product = db.query(Product).filter(Product.product_id == bid.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    highest_bid = db.query(func.max(Bid.amount)).filter(Bid.product_id == product.product_id).scalar()
    if not highest_bid:
        highest_bid = product.starting_price
    
    if bid.bid_amount <= highest_bid:
        raise HTTPException(status_code=400, detail="Bid amount must be higher than the highest bid")
    if product.bidding_end_time < datetime.now():
        raise HTTPException(status_code=400, detail="Bidding has ended for this product")
    new_bid = Bid(product_id=bid.product_id, user_id=current_user.user_id, amount=bid.bid_amount)
    db.add(new_bid)
    db.commit()
    return {"message": "Bid placed successfully"}

@app.get("/protected")
async def protected_route(user: User = Depends(get_current_user)):
    return {"message": f"Hello, {user.name}!"}

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
