import { atom, selector } from "recoil";

export const UserAtom = atom({
    key: "user",
    default: selector({
        key: "userSelector",
        get: async () => {
            const response = await fetch("https://api.github.com/users/Curious-Goblin");
            const json = await response.json();
            return json;
        }
    })
});

function divideStringUntilOpeningCurlyBrace(inputString) {
    // Find the index of the opening curly brace
    const openingCurlyBraceIndex = inputString.indexOf('{');
    
    // Extract the substring from the start of the string until the index of the opening curly brace
    const dividedString = inputString.substring(0, openingCurlyBraceIndex);
    
    return dividedString;
}

async function fetchUserData() {
    const user = await fetch("https://api.github.com/users/Curious-Goblin");
    const userData = await user.json();
    
    const followersResponse = await fetch(userData.followers_url);
    const url=divideStringUntilOpeningCurlyBrace(userData.following_url)
    const followingResponse = await fetch(url);
    const reposResponse = await fetch(userData.repos_url);
    
    const followersData = await followersResponse.json();
    const followingData = await followingResponse.json();
    const reposData = await reposResponse.json();
    
    // Ensure followingData is an array
    const following = Array.isArray(followingData) ? followingData.map(data => data.login) : [];
    
    return {
        followers: followersData.map(data => data.login),
        following: following,
        repos: reposData,
        username: userData.login,
        avatar: userData.avatar_url,
        gitHub: userData.html_url,
        name: userData.name
    };
}

export const UserCredentials = selector({
    key: "credentials",
    get: async ({ get }) => {
        const userDetails = get(UserAtom);
        const userData = await fetchUserData();
        const userDetailsWithNestedData = {
            username: userData.username,
            avatar: userData.avatar,
            gitHub: userData.gitHub,
            followers: userData.followers,
            following: userData.following,
            repos: userData.repos,
            name: userData.name
        };
        return userDetailsWithNestedData;
    }
});
