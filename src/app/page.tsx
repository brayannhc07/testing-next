import { auth0 } from "@/lib/auth0";
import './globals.css';
import axios, { AxiosError } from "axios";

interface Client {
  client_uid: string;
  first_name: string;
  last_name: string;
}

export default async function Home() {
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">
          <button>Sign up</button>
        </a>
        <a href="/auth/login">
          <button>Log in</button>
        </a>
      </main>
    );
  }
  // Fetch the user session
  const accessToken = await auth0.getAccessToken();

  const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
      Authorization: accessToken.token,
    },
  });

   let data: Client[] = [];
   let errorMessage: string | null = null;
   try {
    const response = await axiosInstance.get<Client[]>('/api/clients?limit=10&offset=0');
    data = response.data;
   } catch (error) {
    if ( error as AxiosError) {
      const axiosError = error as AxiosError;
      console.log(axiosError.message);
      errorMessage = axiosError.message;
    }
   }

  // const apiConfig = getApiConfig(auth0);
  // console.log(apiConfig);
  // const api = new DefaultApi(apiConfig);
  // const response = await api.getClients(0, 10)
  // If session exists, show a welcome message and logout button

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <button>Log out</button>
        </a>
      </p>
      <ul>
        {data.map((client: Client) => (
          <li key={client.client_uid}>{client.first_name} {client.last_name}</li>
        ))} 
      </ul>

      { errorMessage && <p>{errorMessage}</p>}
    </main>
  );
}