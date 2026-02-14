/**
 * ChefMentor X – Skeleton Loader Component
 *
 * Shimmer animation for loading states.
 * Usage:
 *   <SkeletonLoader />              → single card skeleton
 *   <SkeletonLoader variant="list" /> → recipe list skeleton
 *   <SkeletonLoader variant="detail" /> → recipe detail skeleton
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');

interface SkeletonLoaderProps {
    variant?: 'card' | 'list' | 'detail' | 'profile';
    count?: number;
}

/* ── Shimmer bar ── */
function ShimmerBar({
    width,
    height,
    borderRadius = 8,
    style,
}: {
    width: number | string;
    height: number;
    borderRadius?: number;
    style?: object;
}) {
    const shimmer = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmer, { toValue: 1, duration: 1200, useNativeDriver: true }),
                Animated.timing(shimmer, { toValue: 0, duration: 1200, useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, []);

    const opacity = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <Animated.View
            style={[
                {
                    width: width as any,
                    height,
                    borderRadius,
                    backgroundColor: Colors.neutral[200],
                    opacity,
                },
                style,
            ]}
        />
    );
}

/* ── Card skeleton ── */
function CardSkeleton() {
    return (
        <View style={styles.card}>
            <ShimmerBar width="100%" height={140} borderRadius={BorderRadius.lg} />
            <View style={styles.cardBody}>
                <ShimmerBar width="70%" height={18} />
                <ShimmerBar width="50%" height={14} style={{ marginTop: 8 }} />
                <View style={styles.cardFooter}>
                    <ShimmerBar width={60} height={24} borderRadius={BorderRadius.full} />
                    <ShimmerBar width={60} height={24} borderRadius={BorderRadius.full} />
                    <ShimmerBar width={60} height={24} borderRadius={BorderRadius.full} />
                </View>
            </View>
        </View>
    );
}

/* ── Detail skeleton ── */
function DetailSkeleton() {
    return (
        <View style={styles.detailContainer}>
            <ShimmerBar width="100%" height={240} borderRadius={0} />
            <View style={styles.detailBody}>
                <ShimmerBar width="80%" height={24} />
                <ShimmerBar width="40%" height={16} style={{ marginTop: 10 }} />
                <View style={styles.detailPills}>
                    <ShimmerBar width={80} height={30} borderRadius={BorderRadius.full} />
                    <ShimmerBar width={80} height={30} borderRadius={BorderRadius.full} />
                    <ShimmerBar width={80} height={30} borderRadius={BorderRadius.full} />
                </View>
                <ShimmerBar width="100%" height={14} style={{ marginTop: 20 }} />
                <ShimmerBar width="90%" height={14} style={{ marginTop: 6 }} />
                <ShimmerBar width="95%" height={14} style={{ marginTop: 6 }} />
                <ShimmerBar width="60%" height={14} style={{ marginTop: 6 }} />

                {/* Steps */}
                {[1, 2, 3].map((i) => (
                    <View key={i} style={styles.stepSkeleton}>
                        <ShimmerBar width={28} height={28} borderRadius={14} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <ShimmerBar width="80%" height={16} />
                            <ShimmerBar width="100%" height={12} style={{ marginTop: 6 }} />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

/* ── Profile skeleton ── */
function ProfileSkeleton() {
    return (
        <View style={styles.profileContainer}>
            <View style={{ alignItems: 'center', paddingTop: 24 }}>
                <ShimmerBar width={88} height={88} borderRadius={44} />
                <ShimmerBar width={120} height={20} style={{ marginTop: 14 }} />
                <ShimmerBar width={160} height={14} style={{ marginTop: 6 }} />
            </View>
            <View style={styles.statsRow}>
                <ShimmerBar width="30%" height={80} borderRadius={BorderRadius.xl} />
                <ShimmerBar width="30%" height={80} borderRadius={BorderRadius.xl} />
                <ShimmerBar width="30%" height={80} borderRadius={BorderRadius.xl} />
            </View>
            <ShimmerBar width="100%" height={160} borderRadius={BorderRadius.xl} style={{ marginTop: 16 }} />
            <ShimmerBar width="100%" height={120} borderRadius={BorderRadius.xl} style={{ marginTop: 12 }} />
        </View>
    );
}

/* ── Main export ── */
export default function SkeletonLoader({ variant = 'card', count = 3 }: SkeletonLoaderProps) {
    if (variant === 'detail') return <DetailSkeleton />;
    if (variant === 'profile') return <ProfileSkeleton />;

    return (
        <View style={styles.listContainer}>
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </View>
    );
}

/* ── Styles ── */
const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: Spacing[4],
        paddingTop: Spacing[4],
        gap: 16,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.neutral[100],
    },
    cardBody: {
        padding: 14,
    },
    cardFooter: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },

    detailContainer: { flex: 1 },
    detailBody: { padding: Spacing[6] },
    detailPills: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 16,
    },
    stepSkeleton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },

    profileContainer: {
        paddingHorizontal: Spacing[6],
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
});
