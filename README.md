## Texty - Realtime chat application using socket.io

### Prerequisite
- Node.js
- Cloudinary.com account (for media storage)


### Installation
  **Clone the repository**
   ```sh
   git clone https://github.com/ankux/Texty
   ```

>Backend Setup

1. **Change the directory to backend**
   ```sh
   cd backend
   ```

2. **Install the dependencies**
   ```sh
   npm install
   ```

3. **Create a `.env` file in the backend directory with the following configurations**

| Variable Name          | Description                                 | Example Value                     | Required |
|------------------------|---------------------------------------------|-----------------------------------|----------|
| `PORT`                 | The port on which the server runs           | `5000`                            | Yes        |
| `MONGODB_URI`            | MongoDB connection URI                      | `mongodb+srv://...`               | Yes        |
| `JWT_SECRET`           | Secret key for signing JWT tokens           | `mySuperSecretKey123`             | Yes        |
| `CLOUDINARY_CLOUD_NAME`| Cloudinary cloud name                       | `my-cloud-name`                   | Yes        |
| `CLOUDINARY_API_KEY`   | Cloudinary API key                          | `123456...`                      | Yes        |
| `CLOUDINARY_API_SECRET`| Cloudinary API secret                       | `abcdEFGHijklM...`                | Yes        |
| `NODE_ENV`             | Environment mode                            | `development` or `production`     | Optional        |


4. **Run the server**
   ```sh
   npm run dev
 
> Frontend Setup

1. **Open a new terminal and change the directory**
   ```sh
   npm install
   ```

2. **Install the dependencies**
   ```sh
   npm install
   ```

3. **Run the server**
   ```sh
   npm run dev
   ```
4. **Open your browser**
   ```sh
   https://localhost:5000/
   ```



### Cloudinary credentials
Login/Sign-up for a free account and get your Cloudinary **Cloud Name** and **API Keys** by following these steps:

1. Go to **Home**
2. Click on **Dashboard**
3. Under **Product Environment**, locate:
   - **Cloud Name**
4. Then click on **Go to API Keys**, copy the
   - **API Key**
   - **API Secret**

> You will need these values for `.env`:
>
> ```env
> CLOUDINARY_CLOUD_NAME=your_cloud_name
> CLOUDINARY_API_KEY=your_api_key
> CLOUDINARY_API_SECRET=your_api_secret
> ```


<div align="center">
  <p>Made by <a href="https://github.com/ankux">ankux</a></p>
  <p>
    <a href="https://github.com/ankux/ai-notes-app/stargazers">
      <img src="https://img.shields.io/github/stars/ankux/Texty" alt="Stars">
    </a>
    <a href="https://github.com/ankux/ai-notes-app/network">
      <img src="https://img.shields.io/github/forks/ankux/Texty" alt="Forks">
    </a>
    <a href="https://github.com/ankux/ai-notes-app/issues">
      <img src="https://img.shields.io/github/issues/ankux/Texty" alt="Issues">
    </a>
  </p>
</div>
