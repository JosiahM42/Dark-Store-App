import react, {useState, Component} from 'react'
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native'

export class productQuantity extends Component {
    constructor(props){
        super(props);
        this.state = {quantityCount : 0};
        // this.state = 0;
    }

    // state={
    //     quantityCount: 0
    // }

    increment = () => {
        // this.setState({quantityCount : this.state + 1});
        this.setState({quantityCount : this.state.quantityCount + 1});
        console.log(this.state)
    }

    decrement = () => {
        if (this.state.quantityCount > 0)
        {
            this.setState({quantityCount : this.state.quantityCount - 1});
        }
        // if (this.state > 0)
        // {
        //     this.setState({quantityCount : this.state - 1});
        // }
    }

    render() {
        const {count} = this.state
        return (
            <View style={styles.quantityFormat}>
                <TouchableOpacity style={styles.button} onPress={this.increment}>
                    <Text>+</Text>
                </TouchableOpacity>

                <Text>{this.state}</Text>

                <TouchableOpacity onPress={this.decrement}>
                    <Text>-</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
    


// export function incrementDecrementCounter(max, min) {
    

//     let increment = () => {
//         if (quantity < max)
//         {
//             setQuantity(quantity + 1);
//         }
//     };

//     let decrement = () => {
//         if (quantity > min)
//         {
//             setQuantity(quantity - 1);
//         }
//     }

//     return(
//         <View style={styles.quantityFormat}>
//             <Button onPress={increment} title='+'/>
//             <Text>{quantity}</Text>
//             <Button onPress={decrement} title='-' />
//         </View>

//     )
// }


// export function incrementDecrementCounter() {
//     let [quantity, setQuantity] = useState(0);

//     let increment = () => {
//         if (quantity < 10)
//         {
//             setQuantity(quantity + 1);
//         }
//     };

//     let decrement = () => {
//         if (quantity > 0)
//         {
//             setQuantity(quantity - 1);
//         }
//     }

//     return(
//         <View style={styles.quantityFormat}>
//             <Button onPress={increment} title='+'/>
//             <Text>{quantity}</Text>
//             <Button onPress={decrement} title='-' />
//         </View>

//     )
// }

const styles = StyleSheet.create({
    quantityFormat: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    }
});