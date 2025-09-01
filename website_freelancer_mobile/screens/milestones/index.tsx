// src/app/accept-milestones/[id]/page.tsx
import React from 'react';
import { View } from 'react-native';
import AcceptMilestones from "./_ui/AcceptMilestones";
import { MilestoneProvider } from "./_ui/ContextMilestone";

const Milestones = () => {
    return (
        <MilestoneProvider>
            <View style={{ flex: 1 }}>
                <AcceptMilestones />
            </View>
        </MilestoneProvider>
    );
}

export default Milestones;