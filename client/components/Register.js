import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const Register = () => {

    const navigation = useNavigation();

const [selectRadio, setSelectRadio] = useState('');
const [fullName, setFullName] = useState('');
const [age, setAge] = useState('');
const [mobileNo, setMobileNo] = useState('');

const handleRadio = (option) => {
    setSelectRadio(option === selectRadio ? null : option);
}

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://192.168.1.21:3000/register', {
                fullName, age, gender:selectRadio, mobileNo
            });

            if (response.status === 201) {
                console.log('User registered successfully:', response.data);
                // navigation.navigate('TabNavigation');
            } else {
                console.error('Registration failed:', response.data);
                // Handle unsuccessful registration (e.g., display error message to the user)
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('There was a problem with the registration:', error);
            // Handle network errors (e.g., display error message to the user)
            alert('Network error. Please check your internet connection and try again.');
        }
    };

    return (
        <>
            <ScrollView>
                <View style={styles.main} >
                    <Text style={styles.registerTxt}>नोंदणी</Text>
                </View>

                <View style={{ marginTop: 20 }} >
                    <View style={styles.inputBox}>
                        <View>
                            <TextInput 
                            placeholder='पूर्ण नाव' 
                            onChangeText={setFullName}
                            value={fullName}
                            placeholderTextColor={'grey'} 
                            style={styles.textInput} />
                        </View>
                        <View style={styles.iconPosition}>
                            <Feather
                                name="user"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput 
                            placeholder='वय' 
                            onChangeText={setAge}
                            value={age}
                            keyboardType='numeric' 
                            placeholderTextColor={'grey'} 
                            style={styles.textInput} />
                        </View>
                        <View style={styles.iconPosition}>
                            <Feather
                                name="user"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>

                    <Text style={{ fontSize: 20, marginLeft: 50, color: 'black', marginBottom: 10, fontWeight: '500' }}>लिंग- </Text>

                    <View style={{ flexDirection: 'row', marginLeft: 27, marginBottom: 10 }}>

                        <TouchableOpacity style={styles.radioBtn} onPress={() => handleRadio('male')}>
                            <View style={[styles.radioOuterCircle, { backgroundColor: selectRadio === 'male' ? 'black' : 'transparent' }]}>
                                {selectRadio === 'male' && <View style={styles.radioInnerCircle}></View>}
                            </View>
                            <Text style={{ fontSize: 20, marginLeft: 12, color: 'black' }}>पुरुष</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.radioBtn} onPress={() => handleRadio('female')}>
                            <View style={[styles.radioOuterCircle, { backgroundColor: selectRadio === 'female' ? 'black' : 'transparent' }]}>
                                {selectRadio === 'female' && <View style={styles.radioInnerCircle}></View>}
                            </View>
                            <Text style={{ fontSize: 20, marginLeft: 12, color: 'black' }}>महिला</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.radioBtn} onPress={() => handleRadio('other')}>
                            <View style={[styles.radioOuterCircle, { backgroundColor: selectRadio === 'other' ? 'black' : 'transparent' }]}>
                                {selectRadio === 'other' && <View style={styles.radioInnerCircle}></View>}
                            </View>
                            <Text style={{ fontSize: 20, marginLeft: 12, color: 'black' }}>इतर</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput 
                            placeholder='मोबाइल नं.' 
                            onChangeText={setMobileNo}
                            value={mobileNo}
                            keyboardType='numeric' 
                            placeholderTextColor={'grey'} 
                            style={styles.textInput} />
                        </View>
                        <View style={styles.iconPosition}>
                            <Feather
                                name="phone"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>


                    <TouchableOpacity style={styles.registerBtn} onPress={()=>navigation.navigate('TabNavigation')}>
                        <Text style={{ textAlign: 'center', marginTop: 7, fontSize: 25, color: 'white', fontWeight: '500' }}>नोंदणी करा</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#4169e1',
        borderBottomLeftRadius: 100,
        height: 65
    },
    registerTxt: {
        fontSize: 25,
        textAlign: 'right',
        marginTop: 15,
        marginRight: 30,
        color: 'white',
        fontWeight: '500',
    },
    textInput: {
        height: 60,
        fontSize: 23,
        alignSelf: 'center',
        width: 310,
        paddingHorizontal: 15,
        color: 'black'

    },
    textInput1: {
        height: 60,
        fontSize: 23,
        alignSelf: 'center',
        width: 310,
        paddingHorizontal: 15,
        color: 'grey',
        marginTop: 25,
        marginLeft: -8

    },
    inputBox: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        width: 320,
        height: 45,
        alignSelf: 'center',
        borderRadius: 10,
    },
    iconPosition: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    registerBtn: {
        height: 50,
        width: 320,
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: '#4169e1'
    },
    radioBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    radioOuterCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',

    },
    radioInnerCircle: {
        // width: 8,
        // height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },

})

export default Register