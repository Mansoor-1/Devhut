import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})


export class AuthService {
    userRef: AngularFireObject<any>;
    userData: any; // Save logged in user data

    constructor(
        public db: AngularFireDatabase,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router
    ) {
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    // Sign in with email/password
    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                if (result.user.emailVerified) {
                    this.router.navigate(['dashboard/projects']);
                    // location.reload()
                    return { status: true }
                } else {
                    console.log('Please verify your email before Sign In')
                    return { status: false, error: 'Please verify your email before Sign In' }
                }
            }).catch((error) => {
                return { status: false, error }
            });
    }

    // Sign up with email/password
    SignUp(email, password, given_name, family_name, photoURL) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                let data = {
                    email,
                    photoURL,
                    given_name,
                    family_name,
                    uid: result.user.uid,
                    emailVerified: result.user.emailVerified,
                    phoneNumber: null
                }
                let displayName = given_name + " " + family_name
                result.user.updateProfile({ displayName, photoURL })
                this.SetUserData(data, data);
                this.afAuth.currentUser.then(res => {
                    res.sendEmailVerification()
                    console.log(res)
                })

                return { status: true, message: 'Success' }
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        return { status: false, message: `Email address ${email} already in use.` }
                    case 'auth/invalid-email':
                        return { status: false, message: `Email address ${email} is invalid.` }
                    case 'auth/operation-not-allowed':
                        return { status: false, message: 'Error during sign up.' }
                    case 'auth/weak-password':
                        return { status: false, message: 'Password is not strong enough. Add additional characters including special characters and numbers.' }
                    default:
                        return { status: false, message: error.message }
                }
            });
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                if (result.additionalUserInfo.isNewUser) {
                    this.router.navigate(['dashboard/projects']);
                    location.reload()
                } else {
                    this.router.navigate(['dashboard/projects']);
                    location.reload()
                }
            }).catch((error) => {
                window.alert(error);
            });
    }


    /* Setting up user data when sign in with username/password
    sign up with username/password and sign in with social auth
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user, profile) {

        const userData = {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            firstName: profile.given_name,
            lastName: profile.family_name,
        };
        this.userRef = this.db.object('users/' + user.uid);
        this.userRef.set(userData);
        
    }


}