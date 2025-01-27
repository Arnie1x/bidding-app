import datetime
from typing_extensions import Annotated
from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy.ext.declarative import declarative_base

import os
from dotenv import load_dotenv
load_dotenv()

Base = declarative_base()

timestamp = Annotated[datetime.datetime, mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())]

class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = timestamp
    updated_at = timestamp

    admins = relationship("Admin", back_populates="user")
    products = relationship("Product", back_populates="user")
    bids = relationship("Bid", back_populates="user")

class Admin(Base):
    __tablename__ = 'admins'

    admin_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    created_at = timestamp
    updated_at = timestamp

    user = relationship("User", back_populates="admins")
    products = relationship("Product", back_populates="created_by")

class Product(Base):
    __tablename__ = 'products'

    product_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    starting_price = Column(Numeric, nullable=False)
    bidding_end_time = Column(DateTime, nullable=False)
    highest_bid = Column(Numeric)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    created_by = Column(Integer, ForeignKey('admins.admin_id'), nullable=False)
    created_at = timestamp
    updated_at = timestamp

    user = relationship("User", back_populates="products")
    created_by_admin = relationship("Admin", back_populates="products")

class Bid(Base):
    __tablename__ = 'bids'

    bid_id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey('products.product_id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    amount = Column(Numeric, nullable=False)
    created_at = timestamp

    product = relationship("Product", back_populates="bids")
    user = relationship("User", back_populates="bids")

def create_tables(engine):
    Base.metadata.create_all(engine)
    
if __name__ == '__main__':
    from sqlalchemy import create_engine
    engine = create_engine(os.getenv('DATABASE_URL'))
    create_tables(engine)
    print('Database tables created')