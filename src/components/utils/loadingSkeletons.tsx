import { Skeleton, Box } from '@mui/material';

export const ChartSkeleton = () => (
    <Box sx={{ width: '100%', height: 400, p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
);

export const ControlSkeleton = () => (
    <Box sx={{ width: 300, height: 600, p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
);

export const MapSkeleton = () => (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
);

export const MapControlSkeleton = () => (
    <Box sx={{ width: 300, height: 400, p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
);

export const MapLegendSkeleton = () => (
    <Box sx={{ width: 200, height: 300, p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
);

export const TransformSkeleton = () => (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
);

export const TransformControlSkeleton = () => (
    <Box sx={{ width: 300, height: 500, p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
);

export const TransformLegendSkeleton = () => (
    <Box sx={{ width: 200, height: 250, p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
);
