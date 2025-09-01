// App.tsx
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import Apply from '@/screens/apply';
import Employer from '@/screens/employer';
import Freelancer from '@/screens/freelancer';
import JobDetail from '@/screens/job-detail';
import JobListingsScreen from '@/screens/job-listings';
import FindJob from '@/screens/jobs';
import LoginScreen from '@/screens/LoginScreen';
import Milestones from '@/screens/milestones';
import { store } from '@/store';
import NavigationBar from './components/ui/NavigationBar';
import useWebSocket from './hooks/useWebSocket';
import GlobalMessage from './screens/_ui/GlobalMessage';
import GlobalNotification from './screens/_ui/GlobalNotification';
import GlobalSpin from './screens/_ui/GlobalSpin';
import ChatBox from './screens/chatbox';
import Conversations from './screens/conversations';
import CreateJob from './screens/create-job';
import FreelancerSearch from './screens/freelancer-search';
import MenuScreen from './screens/MenuScreen';
import Notifications from './screens/notifications';
import PersonalInfo from './screens/personal-info';
import Products from './screens/products';
import WorkSubmit from './screens/work-submit';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Home() {
    const [currentRoute, setCurrentRoute] = useState<string>('login');
    const navigationRef = useNavigationContainerRef();

    return (
        <Provider store={store}>
            <SafeAreaView style={[styles.safeArea, currentRoute !== 'login' ? styles.marginTop10 : styles.marginTop0]}>
                <NavigationContainer
                    ref={navigationRef}
                    onReady={() => {
                        const route = navigationRef.getCurrentRoute()?.name ?? '';
                        setCurrentRoute(route);
                    }}
                    onStateChange={(state) => {
                        if (!state) return;
                        const route = state.routes[state.index].name;
                        setCurrentRoute(route);
                    }}
                >
                    {/* NavigationBar luôn nằm trong NavigationContainer */}
                    <NavigationBar currentRoute={currentRoute as keyof RootStackParamList} />

                    {/* Chỉ kết nối WebSocket khi không ở trang login */}
                    {currentRoute !== 'login' && <LoadWebsocket />}

                    <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName="login"
                    >
                        <Stack.Screen name="login" component={LoginScreen} />
                        <Stack.Screen name="jobs" component={JobListingsScreen} />
                        <Stack.Screen name="milestone" component={Milestones} />
                        <Stack.Screen name="findJob" component={FindJob} />
                        <Stack.Screen name="apply" component={Apply} />
                        <Stack.Screen name="jobDetail" component={JobDetail} />
                        <Stack.Screen name="freelancer" component={Freelancer} />
                        <Stack.Screen name="employer" component={Employer} />
                        <Stack.Screen name="freelancerSearch" component={FreelancerSearch} />
                        <Stack.Screen name="conversations" component={Conversations} />
                        <Stack.Screen name="notifications" component={Notifications} />
                        <Stack.Screen name="menu" component={MenuScreen} />
                        <Stack.Screen name="chatbox" component={ChatBox} />
                        <Stack.Screen name="workSubmit" component={WorkSubmit} />
                        <Stack.Screen name="products" component={Products} />
                        <Stack.Screen name="personalInfo" component={PersonalInfo} />
                        <Stack.Screen name="createJob" component={CreateJob} />
                    </Stack.Navigator>
                </NavigationContainer>

                <GlobalMessage />
                <GlobalSpin />
                <GlobalNotification />
            </SafeAreaView>
        </Provider>
    );
}

const LoadWebsocket = () => {
    useWebSocket();
    return null;
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    marginTop0: {
        marginTop: 0,
    },
    marginTop10: {
        marginTop: 10,
        marginBottom: 80,
    },
});
