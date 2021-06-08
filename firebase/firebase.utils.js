import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAbED2K5TC3ekQsK8cfUfhy3HyUPigZIUE",
	authDomain: "polle-3467a.firebaseapp.com",
	projectId: "polle-3467a",
	storageBucket: "polle-3467a.appspot.com",
	messagingSenderId: "754762490196",
	appId: "1:754762490196:web:6b67c5c2cf862d338528c1",
	measurementId: "G-KVVE0X7W63",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const createPoll = async (poll) => {
	try {
		await firestore.collection("polls").add(poll);

		return {
			message: "created",
		};
	} catch (error) {
		return {
			error: error,
		};
	}
};
