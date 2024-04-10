import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css'
import { UserCredentials } from './atoms/User'
import { useEffect } from 'react';

function App() {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  )
}

function Main() {
  const setUserCredentials = useSetRecoilState(UserCredentials);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCredentialsData = await UserCredentials;
        setUserCredentials(userCredentialsData);
      } catch (error) {
        console.error('Error fetching user credentials:', error);
      }
    };
    fetchData();
  }, [setUserCredentials]);
  
  const userCredentials = useRecoilValue(UserCredentials);
  
  return (
    <div>
      <h1>Name</h1>
      <div>{userCredentials.name}</div>
      <h1>Username</h1>
      <div>{userCredentials.username}</div>
      <h1>avatar</h1>
      <img src={userCredentials.avatar} alt="User Avatar" />
      <h1>GitHub</h1>
      <a href={userCredentials.gitHub}>Click here to see my github</a>
      <h1>Followers</h1>
      <div>{userCredentials.followers.map((data) => (
        <div key={data}>{data}</div>
      ))}</div>
      <h1>Following</h1>
      <div>{userCredentials.following.map((data) => (
        <div key={data}>{data}</div>
      ))}</div>
      <h1>Repos</h1>
      <div>
        {userCredentials.repos.map((data) => (
          <div key={data.id}>{data.name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
