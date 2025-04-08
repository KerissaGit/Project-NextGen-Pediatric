#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db


def create_doctors():
    doctors = []
    names = []
    for _ in range(8):
        name = fake.name()
        while name in names:
            name = fake.name()
        names.append(name)

        d = Doctor(
            name = name,
            specialty = fake.sentence(),
            age_of_care = fake.int()
        )
        doctors.append(d)

    return doctors



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
