import { Account, Avatars, Client, Databases, Query, ID } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ibepy.app_1',
    projectId: '66911c75003cd2e8164f',
    databaseId: '66951b3d0038e211899d',
    userCollectionId: '66951c3a000aac4c130f',
    videoCollectionId: '66951d410012f55b060a',
    storageId: '669529b00026b645a799'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID/ Platform.
;

// Create new user.
const account = new Account(client);
// Create new avatar if there is no error while creating user account.
const avatars = new Avatars(client);
// Create instance of user in the database
const databases = new Databases(client);

// Below is the function for creating new users.
export const createUser = async(email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
// if we don't get a new account, we throw a new error.
        if(!newAccount) throw Error;
// Else if an account is created successfully, We create a new profile photo from the username initials.
        const avatarUrl = avatars.getInitials(username)
// Below we call the signIn function created below this Create user function
        await signIn(email, password);
// Once we sign In the user we can create the user in the database.
// In it we pass the databaseId, the collectionId, the documentId and the Data.
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}


// Below is the function for signing in the user with an account.
export const signIn = async (email, password) => {
    try {
        // Establish a new user session.
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    } catch (error) {
        throw new Error(error);
    }
}



// Below is the function that routes a user with an account to the home screen after they have an active account
// This is done for the global context.
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        // If there is no current account, we throw an error.
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

// Below we created a function to fetch posts from the AppWrite Database and display them on the Home Screen.
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}