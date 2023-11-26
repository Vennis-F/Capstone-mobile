import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, NativeBaseProvider, Button, Icon } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { guestSignIn } from "../apis/auth/api";
import { getAccessToken, setAccessToken } from "../libs/core/handle-token";
import FlashMessage, { showMessage } from "react-native-flash-message";
function Login() {
  const navigation = useNavigation();
  useEffect(() => {
    // Xử lý sau khi navigate
    showMessage({
      message: "Đăng nhập thành công",
      type: "success",
      duration: 3000,
    });
  }, [navigation]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [errorText1, setErrorText1] = useState("");
  const [errorText2, setErrorText2] = useState("");
  const showSuccessMessage = () => {
    // Hiển thị thông báo khi đăng nhập thành công
    showMessage({
      message: "Đăng nhập thành công",
      type: "success",
      duration: 3000, // Thời gian hiển thị (3 giây)
    });
  };
  const handleSubmit = async () => {
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
    if (inputValue1.trim() !== "" && inputValue2.trim() !== "") {
      try {
        const token = await guestSignIn({
          emailOrUsername: inputValue1,
          password: inputValue2,
        });
        await setAccessToken(token.accessToken);

        // Hiển thị thông báo khi đăng nhập thành công
        showSuccessMessage();

        navigation.navigate('index');
        console.log(token);
      } catch (error) {
        console.log("[error when login]", error.message);
      }
    }


  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      }}
    >

      <View style={styles.container}>
        <View style={styles.Middle}>
          <Text style={styles.LoginText}>Xin Chào!</Text>
        </View>
        {/* Username or email input field */}
        <View style={styles.buttonStyle}>
          <View>
            <Text style={styles.emailInput}>Email</Text>
            <Input
              value={inputValue1}
              onChangeText={(text) => setInputValue1(text)}
              variant="outline"
              placeholder="Nhập email "
              borderRadius={10}
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
            />
            {errorText1 && <Text style={{ color: "red" }}>{errorText1}</Text>}
          </View>
        </View>
        {/* Password Input Field */}
        <View style={styles.buttonStyle2}>
          <View>
            <Text style={styles.emailInput}>Mật khẩu</Text>
            <Input
              value={inputValue2}
              onChangeText={(text) => setInputValue2(text)}
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
            {errorText2 && <Text style={{ color: "red" }}>{errorText2}</Text>}
          </View>
        </View>
        <View style={styles.text2}>
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </View>
        {/* Button */}
        <View style={styles.buttonLogin}>
          <Button
            onPress={handleSubmit}
            style={styles.buttonDesgin}
            borderRadius={10}
            paddingBottom={3}
          >
            <Text style={styles.text3}>Đăng nhập</Text>
          </Button>
        </View>
        <View style={styles.text4}>
          <Text style={styles.singupText}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.singupText1}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "500",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    marginTop: 75,
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
  text2: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  forgot: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 2,
  },
  buttonDesgin: {
    backgroundColor: "#FB641B",
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    alignItems: "center",
  },
  text3: {
    color: "black",
    fontSize: 18,
    fontWeight: "400",
    flexDirection: "row",
    justifyContent: "center",
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
  singupText: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
  },
  singupText1: {
    color: "#0000BB",
    fontSize: 15,
    fontWeight: "500",
  },
});
//hoanganh@gmail.com
//Khoi20.01