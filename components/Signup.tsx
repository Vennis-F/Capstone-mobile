import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
  import React, { useState } from "react";
  
  import {
    Input,
    NativeBaseProvider,
    Button,
    Icon,
    Box,
    Image,
    AspectRatio,
  } from "native-base";
  import { FontAwesome5 } from "@expo/vector-icons";
  
  import { useNavigation } from "@react-navigation/native";
  
  function Signup() {
    const navigation = useNavigation();
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [inputValue3, setInputValue3] = useState("");
    const [inputValue4, setInputValue4] = useState("");
    const [errorText1, setErrorText1] = useState("");
    const [errorText2, setErrorText2] = useState("");
    const [errorText3, setErrorText3] = useState("");
    const [errorText4, setErrorText4] = useState("");
  
    const handleSubmit = () => {
      if (inputValue1.trim() === "") {
        // Nếu Input trống, hiển thị thông báo
        setErrorText1("Vui lòng nhập dữ liệu");
      } else {
        // Xử lý khi có giá trị nhập vào Input
        setErrorText1("");
        // ... Thực hiện các xử lý khác ở đây
      }
      if (inputValue2.trim() === "") {
        setErrorText2("Vui lòng nhập dữ liệu");
      } else {
        setErrorText2("");
      }
      if (inputValue3.trim() === "") {
        setErrorText3("Vui lòng nhập dữ liệu");
      } else {
        setErrorText3("");
      }
      if (inputValue4.trim() === "") {
        setErrorText4("Vui lòng nhập dữ liệu");
      } else {
        setErrorText4("");
      }
      if (
        inputValue1.trim() !== "" &&
        inputValue2.trim() !== "" &&
        inputValue4.trim() !== "" &&
        inputValue4.trim() !== ""
      ) {
        // Xử lý khi cả hai trường đều có giá trị
        // ... Thực hiện các xử lý khác ở đây
      }
    };
    return (
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#fff" }}
      >
        <View style={styles.container}>
          <View style={styles.Middle}>
            <Text style={styles.SignupText}>Tạo tài khoản</Text>
          </View>
  
          {/* Name input field */}
          <View style={styles.buttonStyle}>
            <View>
              <Text style={styles.emailInput}>Họ và Tên</Text>
              <Input
                value={inputValue1}
                onChangeText={(text) => setInputValue1(text)}
                variant="outline"
                placeholder="Nhập họ và tên"
                borderRadius={10}
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
              {errorText1 && (
                <Text style={{ color: "red", fontSize: 10 }}>{errorText1}</Text>
              )}
            </View>
          </View>
  
          {/* Username or email input field */}
          <View style={styles.buttonStyle2}>
            <View>
              <Text style={styles.emailInput}>Email</Text>
  
              <Input
                value={inputValue2}
                onChangeText={(text) => setInputValue2(text)}
                variant="outline"
                placeholder="Nhập email"
                borderRadius={10}
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
  
              {errorText2 && (
                <Text style={{ color: "red", fontSize: 10 }}>{errorText2}</Text>
              )}
            </View>
          </View>
  
          {/* Password Input Field */}
          <View style={styles.buttonStyle2}>
            <View>
              <Text style={styles.emailInput}>Mật khẩu</Text>
              <Input
                value={inputValue3}
                onChangeText={(text) => setInputValue3(text)}
                variant="outline"
                placeholder="Nhập mật khẩu"
                borderRadius={10}
                secureTextEntry={true}
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
              {errorText3 && (
                <Text style={{ color: "red", fontSize: 10 }}>{errorText3}</Text>
              )}
            </View>
          </View>
  
          {/* Re-Password Input Field */}
          <View style={styles.buttonStyle3}>
            <Input
              value={inputValue4}
              onChangeText={(text) => setInputValue4(text)}
              variant="outline"
              placeholder="Nhập lại mật khẩu"
              borderRadius={10}
              secureTextEntry={true}
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
            />
            {errorText4 && (
              <Text style={{ color: "red", fontSize: 10 }}>{errorText4}</Text>
            )}
          </View>
  
          {/* Button Create an account */}
          <View style={styles.buttonSigup}>
            <Button
              onPress={handleSubmit}
              style={styles.buttonDesgin}
              borderRadius={10}
              paddingBottom={3}
            >
              <Text style={styles.text3}>Tạo tài khoản</Text>
            </Button>
          </View>
  
          <View style={styles.lineStyle}>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }}></View>
            <Text style={{ width: 60, textAlign: "center" }}> Hoặc</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }}></View>
          </View>
  
          <View style={styles.buttonGoogle}>
            <Button
              style={styles.buttonDesgin2}
              borderRadius={10}
              paddingBottom={3}
            >
              <View style={styles.buttonDesgin3}>
                <Icon
                  style={styles.iconbutton}
                  as={<FontAwesome5 name="google" />}
                  size="lg"
                  _light={{
                    color: "black",
                  }}
                  _dark={{
                    color: "gray.300",
                  }}
                />
                <Text style={styles.text3}> Đăng nhập với google</Text>
              </View>
            </Button>
            <View style={styles.text4}>
              <Text style={styles.loginText}>Bạn đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginText1}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  export default () => {
    return (
      <NativeBaseProvider>
        <Signup />
      </NativeBaseProvider>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    SignupText: {
      marginTop: 70,
      fontSize: 30,
      fontWeight: "500",
    },
    Middle: {
      alignItems: "center",
      justifyContent: "center",
    },
    buttonStyle: {
      marginTop: 30,
      marginBottom: 7,
    },
    emailInput: {
      fontSize: 17,
      fontWeight: "500",
      marginBottom: 2,
    },
    buttonStyle2: {
      marginBottom: 7,
    },
    buttonStyle3: {
      marginBottom: 5,
      marginTop: 5,
    },
    buttonDesgin: {
      backgroundColor: "#FB641B",
    },
    text3: {
      color: "black",
      fontSize: 18,
      fontWeight: "400",
      flexDirection: "row",
      justifyContent: "center",
    },
    buttonSigup: {
      marginTop: 20,
    },
    lineStyle: {
      flexDirection: "row",
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15,
      alignItems: "center",
    },
    buttonDesgin2: {
      backgroundColor: "#FB641B",
    },
    buttonDesgin3: {
      flexDirection: "row",
      justifyContent: "center",
    },
    text4: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 140,
    },
    loginText: {
      color: "black",
      fontSize: 15,
      fontWeight: "500",
    },
    loginText1: {
      color: "#0000BB",
      fontSize: 15,
      fontWeight: "500",
    },
  });
  