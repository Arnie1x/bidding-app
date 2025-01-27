from datetime import datetime
from typing_extensions import Annotated
from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship, mapped_column, backref
from sqlalchemy.ext.declarative import declarative_base

import os
from dotenv import load_dotenv
load_dotenv()

Base = declarative_base()

timestamp = Annotated[datetime, mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())]

class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    bids = relationship("Bid", back_populates="user", cascade="all, delete-orphan")
    # products_bid_on = relationship("Product", back_populates="highest_bidder", foreign_keys="[Product.user_id]")
    admin_profile = relationship("Admin", uselist=False, back_populates="user", cascade="all, delete-orphan")
    
    def check_password(self, password):
        return self.password == password
    def is_admin(self):
        return self.admin_profile is not None

class Admin(Base):
    __tablename__ = 'admins'

    admin_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="admin_profile")
    products_created = relationship("Product", back_populates="creator", cascade="all, delete-orphan")


class Product(Base):
    __tablename__ = 'products'

    product_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    starting_price = Column(Numeric, nullable=False)
    bidding_end_time = Column(DateTime, nullable=False)
    # highest_bid = Column(Numeric)
    # user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)  # Highest bidder
    created_by = Column(Integer, ForeignKey('admins.admin_id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    bids = relationship("Bid", back_populates="product", cascade="all, delete-orphan")
    # highest_bidder = relationship("User", back_populates="products_bid_on", foreign_keys=[user_id])
    creator = relationship("Admin", back_populates="products_created")


class Bid(Base):
    __tablename__ = 'bids'

    bid_id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey('products.product_id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    amount = Column(Numeric, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    product = relationship("Product", back_populates="bids")
    user = relationship("User", back_populates="bids")


def create_tables(engine):
    Base.metadata.create_all(engine)
    
if __name__ == '__main__':
    from sqlalchemy import create_engine
    engine = create_engine(os.getenv('DATABASE_URL'))
    create_tables(engine)
    print('Database tables created')
