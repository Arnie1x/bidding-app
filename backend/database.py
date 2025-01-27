from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, scoped_session
from sqlalchemy.orm.session import sessionmaker
from backend import schema

class Database:
    def __init__(self, db_url):
        self.db_url = db_url
        self.engine = create_engine(db_url)
        self.Session = scoped_session(sessionmaker(bind=self.engine))

    def create_tables(self):
        schema.create_tables(self.engine)

    def get_session(self):
        return self.Session()

    def close_session(self, session):
        session.close()