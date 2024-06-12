
login with google next-auth
Set Up Google OAuth Credentials:

Go to the Google Cloud Console.
Create a new project or select an existing one.
Navigate to "APIs & Services" > "Credentials".
Click on "Create credentials" and select "OAuth client ID".
Choose "Web application" as the application type.
Add authorized redirect URIs. For development, it's typically http://localhost:3000/api/auth/callback/google.
Note down your Client ID and Client Secret.