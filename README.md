#🏥👶 NextGen Pediatrics 🧸🩺
Welcome to NextGen Pediatrics — a mock-up pediatric office built to simulate appointment management and patient care in a sleek, interactive web environment. With a friendly UI and robust backend, this application allows users to book, update, and delete appointments with experienced pediatric doctors, all while viewing bios, reviews, and educational backgrounds.

Whether you're checking in for a routine visit or looking to leave feedback for your doctor, this app ensures a smooth, family-friendly experience. Built with Python, Flask, React, and styled with CSS, this project showcases modern full-stack development with a strong focus on usability and intuitive navigation.

#🎉 Features 🎉
👨‍👩‍👧‍👦 Patient & Appointment Management: Log in and create, modify, or delete appointments for your child.
🩺 Doctor Directory: Browse a list of pediatricians complete with bios, years of experience, education, and review ratings.
🌟 Review System: Add thoughtful reviews for any doctor after your visit to help guide future patients.
🧭 Smooth Navigation: Navigate seamlessly between pages using NavLinks.
💻 Responsive Frontend: Built with React and Material UI for a clean, user-friendly experience.
🔒 Secure Backend: Appointment data and user login secured using Flask and bcrypt encryption.

#💻 Technologies Used 💻
Frontend:

    React

    React Router DOM

    Material UI

    Emotion (CSS-in-JS)

    Formik + Yup for form handling and validation

Backend:

    Python

    Flask

    Flask-RESTful

    Flask-CORS

    Flask-Bcrypt

    Faker (for seeding test data)

#⚙️ Environment Setup ⚙️
#Backend Setup:

pip install flask-restful  
pip install flask-cors  
pip install flask-bcrypt  
pip install faker  

#Frontend Setup:

npm install react-router-dom@6.22.3  
npm install @mui/material @emotion/react @emotion/styled formik yup  


#🙏 Acknowledgments 🙏
A huge thank you to the talented developers who contributed to this project Victoria and Kerissa

#📜 License 📜
This project is licensed under the MIT License.




#Additional Setup Help and Instructions

Setup
server/

The server/ directory contains all of your backend code.

app.py is your Flask application. You'll want to use Flask to build a simple API backend like we have in previous modules. You should use Flask-RESTful for your routes. You should be familiar with models.py and seed.py by now, but remember that you will need to use Flask-SQLAlchemy, Flask-Migrate, and SQLAlchemy-Serializer instead of SQLAlchemy and Alembic in your models.

The project contains a default Pipfile with some basic dependencies. You may adapt the Pipfile if there are additional dependencies you want to add for your project.

To download the dependencies for the backend server, run:

pipenv install
pipenv shell

You can run your Flask API on localhost:5555 by running:

python server/app.py

Check that your server serves the default route http://localhost:5555. You should see a web page with the heading "Project Server".
client/

The client/ directory contains all of your frontend code. The file package.json has been configured with common React application dependencies, include react-router-dom. The file also sets the proxy field to forward requests to `"http://localhost:5555". Feel free to change this to another port- just remember to configure your Flask app to use another port as well!

To download the dependencies for the frontend client, run:

npm install --prefix client

You can run your React app on localhost:3000 by running:

npm start --prefix client

Check that your the React client displays a default page http://localhost:3000. You should see a web page with the heading "Project Client".
Generating Your Database

NOTE: The initial project directory structure does not contain the instance or migrations folders. Change into the server directory:

cd server

Then enter the commands to create the instance and migrations folders and the database app.db file:

flask db init
flask db upgrade head

Type tree -L 2 within the server folder to confirm the new directory structure:

.
├── app.py
├── config.py
├── instance
│   └── app.db
├── migrations
│   ├── README
│   ├── __pycache__
│   ├── alembic.ini
│   ├── env.py
│   ├── script.py.mako
│   └── versions
├── models.py
└── seed.py

Edit models.py and start creating your models. Import your models as needed in other modules, i.e. from models import ....

Remember to regularly run flask db revision --autogenerate -m'<descriptive message>', replacing <descriptive message> with an appropriate message, and flask db upgrade head to track your modifications to the database and create checkpoints in case you ever need to roll those modifications back.

    Tip: It's always a good idea to start with an empty revision! This allows you to roll all the way back while still holding onto your database. You can create this empty revision with flask db revision -m'Create DB'.

If you want to seed your database, now would be a great time to write out your seed.py script and run it to generate some test data. Faker has been included in the Pipfile if you'd like to use that library.
config.py

When developing a large Python application, you might run into a common issue: circular imports. A circular import occurs when two modules import from one another, such as app.py and models.py. When you create a circular import and attempt to run your app, you'll see the following error:

ImportError: cannot import name

If you're going to need an object in multiple modules like app or db, creating a third module to instantiate these objects can save you a great deal of circular grief. Here's a good start to a Flask config file (you may need more if you intend to include features like authentication and passwords):

# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

Now let's review that last line...
CORS

CORS (Cross-Origin Resource Sharing) is a system that uses HTTP headers to determine whether resources from different servers-of-origin can be accessed. If you're using the fetch API to connect your frontend to your Flask backend, you need to configure CORS on your Flask application instance. Lucky for us, that only takes one line:

CORS(app)

By default, Flask-CORS enables CORS on all routes in your application with all fetching servers. You can also specify the resources that allow CORS. The following specifies that routes beginning with api/ allow CORS from any originating server:

CORS(app, resources={r"/api/*": {"origins": "*"}})

You can also set this up resource-by-resource by importing and using the @cross_origin decorator:

@app.route("/")
@cross_origin()
def howdy():
  return "Howdy partner!"