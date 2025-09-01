// screens/LoginScreen.tsx
import { apiPost } from '@/api/baseApi';
import InputCustom from '@/components/ui/InputCustom';
import InputPassword from '@/components/ui/InputPassword';
import { AppDispatch } from '@/store';
import { handleLoginWithToken } from '@/store/persistent/auth';
import { addMessage } from '@/store/volatile/messageSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import {
    ActivityIndicator,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const scrollViewRef = useRef<ScrollView>(null);
    const passwordRef = useRef<TextInput>(null);

    const [form, setForm] = React.useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = React.useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = React.useState(false);

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!form.email) {
            newErrors.email = 'Email không được để trống';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email không hợp lệ';
            valid = false;
        }

        if (!form.password) {
            newErrors.password = 'Mật khẩu không được để trống';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        Keyboard.dismiss();
        setLoading(true);

        apiPost('/auth/login', form).then((res: any) => {
            console.log(res.data)
            dispatch(handleLoginWithToken({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken })).then((role: any) => {
                if (role == "ROLE_FREELANCER") {
                    navigation.navigate("findJob")
                } else {
                    navigation.navigate("freelancerSearch")
                }
            })
        }).catch((err: any) => {
            console.log(err)
            dispatch(addMessage({
                key: "login",
                content: err.data.message,
                type: "error"
            }))
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "height" : "padding"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "android" ? -100 : 0}
        >
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Image
                        source={require('@/assets/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Chào mừng trở lại!</Text>
                    <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>
                </View>

                <View style={styles.formContainer}>
                    <InputCustom
                        label='Email'
                        placeholder='Nhập email'
                        onChangeText={(text) => handleChange('email', text)}
                        error={errors.email}
                        value={form.email}
                        containerStyle={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        returnKeyType="next"
                        leftIcon={<MaterialIcons name="email" size={20} color="#718096" />}
                    />

                    <InputPassword
                        ref={passwordRef}
                        label='Mật khẩu'
                        placeholder='Nhập mật khẩu'
                        onChangeText={(text) => handleChange('password', text)}
                        error={errors.password}
                        value={form.password}
                        containerStyle={styles.input}
                        leftIcon={<MaterialIcons name="lock" size={20} color="#718096" />}
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    {loading ? (
                        <ActivityIndicator size="large" color="#3b72ffff" style={styles.loader} />
                    ) : (
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={loading}
                            activeOpacity={0.8}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Chưa có tài khoản?</Text>
                        <TouchableOpacity>
                            <Text style={styles.signupLink}> Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fc',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 25,
        paddingTop: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        elevation: 10,
        shadowColor: '#3b72ffff',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    logo: {
        width: 140,
        height: 140,
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        color: '#2d3748',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#718096',
        marginBottom: 10,
        fontFamily: 'Inter-Regular',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 25,
        marginTop: 5,
    },
    forgotPasswordText: {
        color: '#3b72ffff',
        fontWeight: '600',
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    },
    loginButton: {
        backgroundColor: '#3b76ffff',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#3b76ffff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5,
        fontFamily: 'Inter-Bold',
    },
    loader: {
        marginVertical: 20,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#edf2f7',
    },
    signupText: {
        color: '#718096',
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
    signupLink: {
        color: '#3b72ffff',
        fontWeight: '600',
        fontFamily: 'Inter-Medium',
    },
    input: {
        marginBottom: 20,
    },
});