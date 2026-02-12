"use client"

import { Component, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(_error: Error, _errorInfo: { componentStack: string }): void {
    }

    handleRetry = (): void => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        minHeight: 400,
                        p: 4,
                        bgcolor: 'background.paper',
                        borderRadius: 1
                    }}
                >
                    <Typography variant="h6" color="error" gutterBottom>
                        Something went wrong
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                        {this.state.error?.message || 'An unexpected error occurred'}
                    </Typography>
                    <Button variant="contained" onClick={this.handleRetry}>
                        Retry
                    </Button>
                </Box>
            );
        }
        return this.props.children;
    }
}

export const ErrorSkeleton = (): JSX.Element => (
    <Box
        sx={{
            width: '100%',
            height: 400,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.paper',
            borderRadius: 1
        }}
    >
        <Typography variant="body1" color="text.secondary">
            Failed to load component
        </Typography>
    </Box>
);

export const ComponentErrorSkeleton = (): JSX.Element => (
    <Box
        sx={{
            width: '100vw',
            height: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.paper'
        }}
    >
        <Typography variant="body1" color="text.secondary">
            Failed to load map
        </Typography>
    </Box>
);
