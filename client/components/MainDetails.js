import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, Button, Image, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';


const Animal = require('./models/Animal');

const MainDetails = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [showDatePicker3, setShowDatePicker3] = useState(false);

    const [cattleName, setCattleName] = useState('');
    const [cattleType, setCattleType] = useState('');
    const [cattlePhoto, setCattlePhoto] = useState('');
    const [medicineName, setMedicineName] = useState('');
    const [medicineGivenDate, setMedicineGivenDate] = useState('');
    const [medicineEndDate, setMedicineEndDate] = useState('');
    const [nextMedicineDate, setNextMedicineDate] = useState('');
    const [medicinePhoto, setMedicinePhoto] = useState('');

    const [animalDetails, setAnimalDetails] = useState([]);

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
    };

    const showDatepicker3 = () => {
        setShowDatePicker3(true);
    };

    const handleDateChange1 = (event, selectedDate, dateSetter) => {
        if (selectedDate) {
            setShowDatePicker1(false);
            const selectedDateObject = new Date(selectedDate);
            dateSetter(setMedicineGivenDate(selectedDateObject));
        }
    };

    const handleDateChange2 = (event, selectedDate,dateSetter) => {
        if (selectedDate) {
            setShowDatePicker2(false);
            const selectedDateObject = new Date(selectedDate);
            dateSetter(setMedicineEndDate(selectedDateObject));
        }
    };

    const handleDateChange3 = (event, selectedDate, dateSetter) => {
        if (selectedDate) {
            setShowDatePicker3(false);
            const selectedDateObject = new Date(selectedDate);
            dateSetter(setNextMedicineDate(selectedDateObject));
        }
    };

    const formatDateToString = date => {
        if (!date || isNaN(date.getTime())) return '';

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`
    }

    const selectImage = (setImage) => {
        let options = {
            mediaType: 'photo',
            quality: 0.5,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error:', response.error);
            } else {
                console.log('Image picked:', response.assets[0].uri);
                setImage(response.assets[0].uri);
            }
        });
    };

    const saveAnimalDetails = async () => {
        const newAnimalDetails = {
            cattleName,
            cattleType,
            cattlePhoto,
            medicineName,
            medicineGivenDate,
            medicineEndDate,
            nextMedicineDate,
            medicinePhoto
        };

        setAnimalDetails([...animalDetails, newAnimalDetails]);

        const formData = new FormData();
        formData.append('cattlePhoto', {
            uri: cattlePhoto,
            type: 'image/jpeg',
            name: 'cattlePhoto.jpg',
        });
        formData.append('medicinePhoto', {
            uri: medicinePhoto,
            type: 'image/jpeg',
            name: 'medicinePhoto.jpg',
        });
        formData.append('cattleName', cattleName);
        formData.append('cattleType', cattleType);
        formData.append('medicineName', medicineName);
        formData.append('medicineGivenDate', formatDateToString(medicineGivenDate));
        formData.append('medicineEndDate', formatDateToString(medicineEndDate));
        formData.append('nextMedicineDate', formatDateToString(nextMedicineDate));

        try {
            const response = await axios.post('http://192.168.1.21:3000/animalDetails', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log('Animal details saved successfully');
            } else {
                console.log('Failed to save animal details');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Clear input fields
        setCattleName('');
        setCattleType('');
        // setCattlePhoto('');
        setMedicineName('');
        setMedicineGivenDate('');
        setMedicineEndDate('');
        setNextMedicineDate('');
        // setMedicinePhoto('');

        setShowModal(false);
    };

    
    return (
        <>
        {animalDetails.map((animal, index) => (
            <View style={{ width: '95%', height: 250, alignSelf: 'center', marginTop: 30, borderRadius:10, backgroundColor:'white', elevation:3}}>
                {/* Cow Details */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image source={{ uri: animal.cattlePhoto }} style={{ width: 100, height: 100, marginLeft: 20, borderRadius: 10, top:16}} />
                    <View style={{top:10}}>
                        <Text style={{ color: 'black', fontSize: 23, marginLeft: 30, }}>{animal.cattleName}</Text>
                        <Text style={{ color: 'black', fontSize: 23, marginLeft: 35, }}>{animal.cattleType}</Text>
                    </View>
                </View>

                {/* Medicine details */}
                <View style={{ flex: 1, flexDirection: 'row', marginTop: -20 }}>
                    <Image source={{ uri: animal.medicinePhoto }} style={{ width: 100, height: 100, marginLeft: 20, borderRadius: 10, top:15}} />
                    <View style={{top:10}}>
                        <Text style={{ color: 'black', fontSize: 23, marginLeft: 28, marginTop: -10, }}>{animal.medicineName}</Text>
                        <Text style={{ color: 'black', fontSize: 23, marginLeft: 32, }}>{formatDateToString(animal.medicineGivenDate)}</Text>
                        <Text style={{ color: 'black', fontSize: 23, marginLeft: 32, }}>{formatDateToString(animal.medicineEndDate)}</Text>
                        <Text style={{ color: 'black', fontSize: 23, marginLeft: 32, flexWrap: 'wrap' }}>{formatDateToString(animal.nextMedicineDate)}</Text>
                    </View>
                </View>
            </View>
        ))}

            <TouchableOpacity onPress={() => setShowModal(true)}>
                <View style={styles.addAnimal}>
                    <Text style={{ textAlign: 'center', marginTop: 7, fontSize: 25, color: 'white', fontWeight: '500' }}>+ Add Animal</Text>
                </View>
            </TouchableOpacity>
            

            <Modal visible={showModal} animationType="slide">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={styles.main} >
                        <Text style={styles.registerTxt}>माहिती भरा</Text>
                    </View>
                    <View style={{ marginTop: 15, marginLeft: 20, position: 'absolute', zIndex: 1 }}>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Feather
                                name="arrow-left"
                                size={25}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputBox}>

                        {/* Adding Animal  */}
                        <View>
                            <TextInput
                                placeholder='गुरे / ढोराचं नाव'
                                onChangeText={setCattleName}
                                value={cattleName}
                                placeholderTextColor={'grey'}
                                style={styles.textInput} />
                        </View>
                        <View style={styles.iconPosition}>
                            <MaterialCommunityIcons name="cow" size={25} color="black" />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput
                                placeholder='गुरे / ढोराचं प्रकार'
                                onChangeText={setCattleType}
                                value={cattleType}
                                placeholderTextColor={'grey'}
                                style={styles.textInput} />

                        </View>
                        <View style={styles.iconPosition}>
                            <MaterialCommunityIcons
                                name="cow"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>

                    {/* Image Upload */}
                    <Text style={{ fontSize: 18, textAlign:'center', top:8}}>Upload Cattle Image</Text>
                    <View style={styles.imgInput}>
                        <TouchableOpacity onPress={() => selectImage(setCattlePhoto)}>
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                {cattlePhoto ? (
                                    <Image source={{ uri: cattlePhoto }} style={{ width: 200, height: 200, bottom:10, borderRadius:10 }} />
                                ) : (
                                    <View style={{ width: 200, height: 200, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center', marginBottom: 22, borderRadius: 10, }}>
                                        <Text>No image selected</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput
                                placeholder='औषधाचे नाव'
                                onChangeText={setMedicineName}
                                value={medicineName}
                                placeholderTextColor={'grey'}
                                style={styles.textInput} />
                        </View>
                        <View style={styles.iconPosition}>
                            <MaterialCommunityIcons
                                name="cow"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>

                    <TouchableOpacity>
                        <TouchableOpacity onPress={showDatepicker1}>
                            <View style={styles.inputBox}>
                                <View>
                                    {medicineGivenDate ? (
                                        <Text style={{ flex: 1, fontSize: 20, color: 'black', marginTop: 6, marginLeft: 12 }}>
                                            {formatDateToString(new Date(medicineGivenDate))}
                                        </Text>
                                    ) : (
                                        <Text style={{ flex: 1, fontSize: 20, color: 'gray', marginTop: 6, marginLeft: 12 }}>
                                            औषध दिल्याचे तारिक
                                        </Text>
                                    )}
                                    {showDatePicker1 && (
                                        <DateTimePicker
                                            value={medicineGivenDate ? new Date(medicineGivenDate) : new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => handleDateChange1(event, selectedDate)}
                                        />
                                    )}
                                </View>
                                <View style={styles.iconPosition}>
                                    <AntDesign
                                        name="medicinebox"
                                        size={25}
                                        color="black"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showDatepicker2}>
                            <View style={styles.inputBox}>
                                <View>
                                    {medicineEndDate ? (
                                        <Text style={{ flex: 1, fontSize: 20, color: 'black', marginTop: 6, marginLeft: 12 }}>
                                            {formatDateToString(new Date(medicineEndDate))}
                                        </Text>
                                    ) : (
                                        <Text style={{ flex: 1, fontSize: 20, color: 'gray', marginTop: 6, marginLeft: 12 }}>
                                            औषध दिल्याचे तारिक
                                        </Text>
                                    )}
                                    {showDatePicker2 && (
                                        <DateTimePicker
                                            value={medicineEndDate ? new Date(medicineEndDate) : new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => handleDateChange2(event, selectedDate)}
                                        />
                                    )}
                                </View>
                                <View style={styles.iconPosition}>
                                    <AntDesign
                                        name="medicinebox"
                                        size={25}
                                        color="black"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showDatepicker3}>
                            <View style={styles.inputBox}>
                                <View>
                                    {nextMedicineDate ? (
                                        <Text style={{ flex: 1, fontSize: 20, color: 'black', marginTop: 6, marginLeft: 12 }}>
                                            {formatDateToString(new Date(nextMedicineDate))}
                                        </Text>
                                    ) : (
                                        <Text style={{ flex: 1, fontSize: 20, color: 'gray', marginTop: 6, marginLeft: 12 }}>
                                            औषध दिल्याचे तारिक
                                        </Text>
                                    )}
                                    {showDatePicker3 && (
                                        <DateTimePicker
                                            value={nextMedicineDate ? new Date(nextMedicineDate) : new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => handleDateChange3(event, selectedDate)}
                                        />
                                    )}
                                </View>
                                <View style={styles.iconPosition}>
                                    <AntDesign
                                        name="medicinebox"
                                        size={25}
                                        color="black"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Image Upload */}
                        <Text style={{ fontSize: 18, textAlign:'center', top:8 }}>Upload Medicine Image</Text>
                        <View style={styles.imgInput}>
                            <TouchableOpacity onPress={() => selectImage(setMedicinePhoto)}>
                                <View style={{ alignItems: 'center', marginTop: 20 }}>
                                    {medicinePhoto ? (
                                        <Image source={{ uri: medicinePhoto }} style={{ width: 200, height: 200, bottom:10, borderRadius:10 }} />
                                    ) : (
                                        <View style={{ width: 200, height: 200, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center', marginBottom: 22, borderRadius: 10, }}>
                                            <Text>No image selected</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={saveAnimalDetails}>
                            <View style={styles.saveBtn} >
                                <Text style={{ textAlign: 'center', marginTop: 8, fontSize: 25, color: 'white', fontWeight: '500' }}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        // flex: 1,
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
    itemContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
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
    imgInput: {
        margin: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        width: 200,
        height: 200,
        alignSelf: 'center',
        borderRadius: 10,
    },
    saveBtn: {
        height: 50,
        width: 320,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#4169e1'
    },
    addAnimal: {
        height: 50,
        width: 320,
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: '#4169e1'
    },
    textInput: {
        height: 60,
        fontSize: 20,
        alignSelf: 'center',
        width: 310,
        paddingHorizontal: 15,
        color: 'black'

    },
});

export default MainDetails;