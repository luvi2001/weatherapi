# weatherapi

## 🌍 Get City Name from Coordinates Using Google Cloud  

This application uses **Google Cloud's Geocoding API** to convert latitude and longitude into a city name.  

### ✅ Steps to Set Up Google Geocoding API  

1️⃣ **Enable Google Geocoding API**  
- Go to [Google Cloud Console](https://console.cloud.google.com/).  
- Create a **New Project** or select an existing one.  
- Navigate to **"APIs & Services" > "Library"**.  
- Search for **Geocoding API** and enable it.  
- Go to **"APIs & Services" > "Credentials"**.  
- Click **"Create Credentials" > "API Key"**.  
- Copy the API key and store it safely.  

---

### 📌 **API Endpoint for Getting City Name**  
Use this API endpoint to convert latitude and longitude to a city name:  https://maps.googleapis.com/maps/api/geocode/json?latlng=LATITUDE,LONGITUDE&key=YOUR_API_KEY






## Deployment on AWS  

To deploy this application on AWS, follow these steps:  

### 1. Choose AWS Services  
- **Compute Service:**  
  - Use **AWS Elastic Beanstalk** for easy deployment.  
  - Alternatively, use **Amazon EC2** for full control over the server.  

- **Database Service:**  
  - Use **Amazon DocumentDB** (MongoDB-compatible) or **MongoDB Atlas** for data storage.  

### 2. Set Up the Server  
- If using **EC2**, launch an instance (Ubuntu recommended).  
- Install dependencies:  
  ```bash
  sudo apt update
  sudo apt install -y nodejs npm

### Clone the project and install dependencies
- Install dependencies: 
  ```bash
   git clone https://github.com/your-repo.git
   cd your-project
   npm install


### Create a .env file and configure
MONGO_URI=your_mongo_db_uri
OPENWEATHER_API_KEY=your_api_key
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

### Start the server
- start the server
  ```bash
  node server.js

## API Testing with Postman

### 1. Register a New User
**Endpoint:**
```
POST /users
```
**Request Body:** (JSON)
```json
{
  "email": "user@example.com",
  "location": "New York, USA"
}
```
**Steps in Postman:**
1. Open Postman and create a new request.
2. Select `POST` method and enter `http://localhost:<PORT>/users`.
3. Go to the `Body` tab, select `raw`, and choose `JSON` as the format.
4. Copy and paste the JSON request body.
5. Click `Send`.

**Expected Response:**
```
201 Created - "User registered successfully"
```

---

### 2. Update User Location
**Endpoint:**
```
PUT /users/:email
```
**Request Body:** (JSON)
```json
{
  "location": "Los Angeles, USA"
}
```
**Steps in Postman:**
1. Open Postman and create a new request.
2. Select `PUT` method and enter `http://localhost:<PORT>/users/user@example.com` (Replace with actual email).
3. Go to the `Body` tab, select `raw`, and choose `JSON` as the format.
4. Copy and paste the JSON request body.
5. Click `Send`.

**Expected Response:**
```
200 OK - "Location updated successfully"
```

---

### Notes:
- Replace `<PORT>` with the actual port number your Express server is running on.
- Ensure MongoDB is running before testing.
- Use valid email addresses when testing.

