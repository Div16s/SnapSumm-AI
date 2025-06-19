
const ProgressBar = ({
    sections,
    currentSection
}: {
    sections: Array<{ title: string; points: string[] }>;
    currentSection: number;
}) => {
    return (
        <div className="absolute top-0 left-0 right-0 w-full z-20 h-2 backdrop-blur-xs bg-gray-200 rounded-full overflow-hidden">
            <div
                className="h-full bg-linear-to-r from-gray-500 to-blue-600 transition-all duration-300"
                style={{
                    width: `${((currentSection + 1) / sections.length) * 100}%`
                }}
            />
        </div>
    );
}

export default ProgressBar;
