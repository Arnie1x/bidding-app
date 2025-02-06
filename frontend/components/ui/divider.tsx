export interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
}

export default function Divider({ orientation = 'horizontal' }: DividerProps) {
    if (orientation === 'horizontal') {
        return <div className="w-full h-px bg-gray-200" />;
    }

    return <div className="min-h-7 h-full w-px bg-gray-200" />;
}
