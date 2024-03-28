import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { Formik } from 'formik'
import * as yup from "yup";
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function Generator() {
    
    const [password1,setPassword1]=useState("");
    const [isGenerated,setIsGenerated]=useState(false);
    const [islower,setIslower]=useState(true);
    const [isupper,setIsupper]=useState(false);
    const [isnumber,setIsnumber]=useState(false);
    const [isspecial,setIsspecial]=useState(false);
    let character="";
    

    const validate=yup.object().shape({
        passwordLength:yup.number().min(4,"Minimum length is 4").max(16,"Maximum length is 16").required("Length of Password is required")
    });
    function generatePassword(passwordLength){
        
        if(isupper)
           character+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if(islower)
            character+="abcdefghijklmnopqrstuvwxyz"
        if(isnumber)
            character+="1234567890"
        if(isspecial)
            character+="!@#$%^&*_-?/|~`"

         let result=createPassword(passwordLength,character)
         setPassword1(result) 
        setIsGenerated(true)
    }
    function createPassword(passwordLength,character){
        let password ="";
        for (let index = 0; index<passwordLength; index++) {
            password += String(character[Math.round(Math.random()*(character.length-1))]);
        }
        return password
    }

    function resetPass(){
        character="",
        setIslower(true);
        setIsnumber(false);
        setIsspecial(false);
        setIsupper(false);
        setIsGenerated(false)
    }
  return (
   <SafeAreaView>
    <ScrollView>
        <View>
            <Text style={styles.head}>Password  Generator</Text>
        </View>
        <Formik
       initialValues={{ passwordLength:''}}
       validationSchema={validate}
       onSubmit={(values)=>{
          generatePassword(Number(values.passwordLength))
          setIsGenerated(true)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset
       }) => (
        <View style={styles.inputs}>
        <View style={styles.input}>
         <View style={styles.label} >
              <Text style={styles.inputLabel}>Enter the Length :</Text>
              {touched.passwordLength &&errors.passwordLength &&<Text style={styles.err}>{errors.passwordLength}</Text>}
         </View>
         <TextInput  style={styles.inputBox}
         placeholder='Length of Password'
         keyboardType='numeric'
         value={values.passwordLength}
         onChangeText={handleChange("passwordLength")}
         />
        </View>
        <View style={styles.input}>
         <View style={styles.label} >
              <Text style={styles.inputLabel}>Lowercase Inculdes:</Text>
         </View>
         <BouncyCheckbox
         isChecked={islower}
         onPress={()=>setIslower(prev=>!prev)}
         fillColor='green'
         disableBuiltInState
         />
        
        </View>
        <View style={styles.input}>
         <View style={styles.label} >
              <Text style={styles.inputLabel}>Uppercase Inculdes:</Text>
         </View>
         <BouncyCheckbox
         isChecked={isupper}
         onPress={()=>setIsupper(prev=>!prev)}
         fillColor='green'
         disableBuiltInState
         />
        </View>
        <View style={styles.input}>
         <View style={styles.label} >
              <Text style={styles.inputLabel}>Number Inculdes :</Text>
         </View>
         <BouncyCheckbox
         isChecked={isnumber}
         onPress={()=>setIsnumber(prev=>!prev)}
         fillColor='green'
         disableBuiltInState
         />
        </View>
        <View style={styles.input}>
         <View style={styles.label} >
              <Text style={styles.inputLabel}>Special Symbols Inculdes :</Text>
         </View>
         <BouncyCheckbox
         isChecked={isspecial}
         onPress={()=>setIsspecial(prev=>!prev)}
         fillColor='green'
         disableBuiltInState
         />
        </View>
        <View style={styles.btns}>
            <TouchableOpacity onPress={()=>handleSubmit()} disabled={!isValid}  style={styles.primaryBtns}><Text  style={styles.primaryBtnText}>Generate Password</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{handleReset(),resetPass()}}  style={styles.secondBtns}><Text   style={styles.secondBtnText}>Reset</Text></TouchableOpacity>
        </View>
     </View>
       )}
     </Formik>
     {isGenerated ?
        <View style={styles.result}>
        <Text style={styles.resultHead}>Generated Password:</Text>
         <Text selectable style={styles.resultpass}>{password1}</Text>
     
        </View> :null
     }
     
    </ScrollView>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    head:{
        fontSize:30,
        textAlign:"center",
        fontWeight:"700",
        marginVertical:5
    },
    inputs:{
        display:"flex",
        flexDirection:"column",
        marginVertical:5,
        borderRadius:10
    },
    input:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        
        padding:10,
        
    },
    inputLabel:{
        fontSize:18,
        padding: 2, 
        fontWeight:"600",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"

    },
    inputLabels:{
        fontSize:14,
        padding: 2, 
        fontWeight:"600",
    },
    err:{
        fontSize:8,
        color:"red"
    },
    label:{
        width:"50%",
    },
    inputBox:{
    width:"50%",
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor:"white",
    color:"black",
    borderRadius: 5, 
    padding: 3, 
    },
    btns:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        padding:5,
        marginVertical:7

    },
    primaryBtns:{
       padding:8,
       backgroundColor:"green",
       borderRadius:10
    },
    secondBtns:{
        padding:8,
        backgroundColor:"#dd4c35",
        borderRadius:10
        
    },
    primaryBtnText:{
        color:"#fff",
        fontSize:20
    },
    secondBtnText:{
        color:"#fff",
        fontSize:20,
       
    },
    result:{
        display:"flex",
        backgroundColor:"green",
        padding:6,
        borderRadius:10,
        paddingBottom:18
    },
    resultHead:{
        fontSize:20,
        color:"white",
        marginVertical:4
    },
    resultpass:{
        fontSize:18,
        fontWeight:"700",
        textAlign:"center",
        color:"white"
    }
    
})