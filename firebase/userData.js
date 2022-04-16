import { auth, firestore } from '../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import { getUsersData, getUser } from '../redux/reducers/users';
import { useDispatch } from 'react-redux';

//const userDetails = useSelector(getUser);
//const dispatchHook = useDispatch()

export const userData = () => {
    
    const dispatchHook = useDispatch()
    const user = auth.currentUser.uid;

    const details = []
    //console.log(user)

    firestore.collection('users').doc(user).onSnapshot(
        (userSnapshot) => {
            details.push({
                name: userSnapshot.data().name.toString(),
                phone: userSnapshot.data().phone.toString(),
                email: userSnapshot.data().email.toString()
                // name: userSnapshot.data().name,
                // phone: userSnapshot.data().phone,
                // email: userSnapshot.data().email
            })
            // setUser(details)
            dispatchHook(getUsersData({
                name: details.name,
                phone: details.phone, 
                email: details.email
            }))
            
            //console.log(details)
        })
    
}