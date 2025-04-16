#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, jsonify, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import NoResultFound
from datetime import datetime
from flask_cors import CORS

# Local imports
from config import app, db, api, bcrypt
from models import Parent, Child, Doctor, Appointment, Review

# Views go here!

class Index(Resource):
    def get(self):
        return '<h1>Project Server</h1>'


class Parents(Resource):
    def get(self):
        parents = db.session.execute(db.select(Parent)).scalars().all()
        parents_list = [parent.to_dict() for parent in parents]
        print("Session after login:", dict(session))  # or after registration

        return make_response({"parents": parents_list}, 200)


class Children(Resource):
    def get(self):
        children = db.session.execute(db.select(Child)).scalars().all()
        return make_response([child.to_dict() for child in children], 200)

    def post(self):
        params = request.json
        try:
            if not params.get('name'):
                return make_response({"errors": ["Missing required field: name"]}, 400)

            child = Child(name=params['name'])
            db.session.add(child)
            db.session.commit()
            return make_response(child.to_dict(), 201)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)


class ChildById(Resource):
    def get(self, id):
        try:
            child = db.session.execute(db.select(Child).filter_by(id=id)).scalar_one()
            return make_response(child.to_dict(), 200)
        except NoResultFound:
            return make_response({"error": "Child not found"}, 404)

    def patch(self, id):
        try:
            child = db.session.execute(db.select(Child).filter_by(id=id)).scalar_one()
            params = request.json
            for key, value in params.items():
                setattr(child, key, value)
            db.session.commit()
            return make_response(child.to_dict(), 202)
        except NoResultFound:
            return make_response({"error": "Child not found"}, 404)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)


class Doctors(Resource):
    def get(self):
        doctors = db.session.execute(db.select(Doctor)).scalars().all()
        return make_response([doctor.to_dict() for doctor in doctors], 200)


from flask import request, make_response, session
from flask_restful import Resource
from models import Appointment, Parent
from datetime import datetime
from app import db

class Appointments(Resource):
    def post(self):
        try:
            params = request.get_json()
            print("🚨 Incoming JSON payload:", params)

            start_time = datetime.strptime(params['start_time'], "%Y-%m-%dT%H:%M")
            end_time = datetime.strptime(params['end_time'], "%Y-%m-%dT%H:%M")

            appointment = Appointment(
                child_id=int(params['child_id']),
                doctor_id=int(params['doctor_id']),
                start_time=start_time,
                end_time=end_time
            )
            appointment.validate_time_order()

            db.session.add(appointment)
            db.session.commit()

            return make_response(appointment.to_dict(), 201)

        except KeyError as e:
            print("Missing field:", e)
            return make_response({"errors": [f"Missing field: {str(e)}"]}, 400)
        except ValueError as e:
            print("Value error:", e)
            return make_response({"errors": [f"Invalid value: {str(e)}"]}, 400)
        except Exception as e:
            print("Unexpected error:", e)
            return make_response({"errors": [f"Unexpected error: {str(e)}"]}, 400)

    def get(self):
        parent_id = session.get('parent_id')
        if not parent_id:
            return make_response({"error": "Unauthorized"}, 401)

        parent = Parent.query.get(parent_id)
        if not parent:
            return make_response({"error": "Parent not found"}, 404)

        appointments = []
        for child in parent.children:
            appointments.extend(child.appointments)

        appt_dicts = []
        for appt in appointments:
            data = appt.to_dict()
            data["doctor_name"] = appt.doctor.name
            data["child_name"] = appt.child.name
            appt_dicts.append(data)

        return make_response(appt_dicts, 200)

    def patch(self, id):
        try:
            appointment = Appointment.query.get(id)
            if not appointment:
                return make_response({"error": "Appointment not found"}, 404)

            params = request.get_json()

            if 'start_time' in params:
                appointment.start_time = datetime.strptime(params['start_time'], "%Y-%m-%dT%H:%M")
            if 'end_time' in params:
                appointment.end_time = datetime.strptime(params['end_time'], "%Y-%m-%dT%H:%M")
            if 'child_id' in params:
                appointment.child_id = int(params['child_id'])
            if 'doctor_id' in params:
                appointment.doctor_id = int(params['doctor_id'])

            appointment.validate_time_order()

            db.session.commit()

            return make_response(appointment.to_dict(), 200)

        except ValueError as e:
            return make_response({"errors": [f"Invalid value: {str(e)}"]}, 400)
        except Exception as e:
            return make_response({"errors": [f"Unexpected error: {str(e)}"]}, 400)

    def delete(self, id):
        try:
            appointment = Appointment.query.get(id)
            if not appointment:
                return make_response({"error": "Appointment not found"}, 404)

            db.session.delete(appointment)
            db.session.commit()

            return make_response({}, 204)

        except Exception as e:
            return make_response({"errors": [f"Unexpected error: {str(e)}"]}, 400)




class Reviews(Resource):
    def post(self):
        params = request.json
        try:
            review = Review(
                doctor_id=params["doctor_id"],
                rating=params["rating"],
                comment=params.get("comment", "")
            )
            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(), 201)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)



class ParentRegistration(Resource):
    def post(self):
        try:
            params = request.get_json()
            print("Received /parent payload:", params)

            username = params.get('username')
            password = params.get('password')
            email = params.get('email', '')
            children_params = params.get('children', [])

            # Check required fields
            if not username or not password or not children_params:
                print("Missing required fields")
                return make_response({"error": "Missing required fields"}, 400)

            # Create new parent and use the password setter 
            parent = Parent(username=username, email=email)
            parent.password_hash = password  # This triggers the setter which hashes the password

            # Add associated children
            for child in children_params:
                name = child.get('name')
                age = child.get('age')
                print(f"➡️ Adding child: name={name}, age={age} (type: {type(age)})")

                if not name or age is None:
                    print("Invalid child data")
                    return make_response({"error": "Child must have a name and age"}, 400)

                new_child = Child(name=name, age=age)
                parent.children.append(new_child)

            db.session.add(parent)
            db.session.commit()

            # Log the user in by setting session
            session['parent_id'] = parent.id
            print("Parent created successfully:", parent.to_dict())

            return make_response(parent.to_dict(), 201)

        except Exception as e:
            import traceback
            traceback.print_exc()
            return make_response({"error": f"Exception occurred: {str(e)}"}, 400)





class CurrentParent(Resource):
    def get(self):
        parent_id = session.get('parent_id')
        if not parent_id:
            return make_response({'error': 'Unauthorized'}, 401)
        parent = Parent.query.get(parent_id)
        if not parent:
            return make_response({'error': 'Parent not found'}, 404)
        return make_response(parent.to_dict(), 200)
    

class Login(Resource):
    def post(self):
        params = request.get_json()
        parent = Parent.query.filter_by(username=params.get('username')).first()
        if not parent:
            return make_response({'error': 'parent not found'}, 404)
        if parent.authenticate(params.get('password')):
            session['parent_id'] = parent.id  # Sets the session
            return make_response(parent.to_dict(), 200)
        else:
            return make_response({"error": "Invalid username or password"}, 401)

        
class Logout(Resource):
    def delete(self):
        session.pop('parent_id', None)
        return make_response({}, 204)


# Routing
api.add_resource(Index, '/')
api.add_resource(Parents, '/parents')
api.add_resource(Children, '/children')
api.add_resource(ChildById, '/children/<int:id>')
api.add_resource(Doctors, '/doctors')
api.add_resource(Reviews, '/reviews')
api.add_resource(ParentRegistration, '/parent')
api.add_resource(CurrentParent, '/me')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Appointments, '/appointments', '/appointments/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
