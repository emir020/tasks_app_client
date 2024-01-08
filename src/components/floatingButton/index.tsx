// FloatingButton.tsx
import React, { ReactNode, useState } from "react";

interface FloatingButtonProps {
  children: ReactNode;
  // style?: React.CSSProperties;
  // containerStyle?: React.CSSProperties;
  style?: string;
  containerStyle?: string;
  tooltipStyle?: string;
  position?: "bottomRight" | "bottomLeft";
  tooltip?: string;
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  style,
  containerStyle,
  tooltipStyle,
  position = "bottomRight",
  tooltip,
  onClick,
}) => {
  // State to manage tooltip visibility
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  // Event handlers for showing and hiding tooltip
  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  // Helper function to determine tooltip position class
  const getPositionClass = () => {
    switch (position) {
      case "bottomLeft":
        return "left-4";
      case "bottomRight":
      default:
        return "right-4";
    }
  };

  // Main component rendering
  return (
    <div className={`fixed bottom-4 right-4 z-[10] ${containerStyle}`}>
      <div
        style={{
          bottom: 12, // Adjusted bottom value
          ...(position === "bottomLeft" ? { left: 4 } : { right: 4 }), // Adjusted left/right value
        }}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {/* Floating button */}
        <div
          onClick={() => onClick()}
          className={`w-12 h-12 bg-blue-500 rounded-full text-white flex items-center justify-center shadow-lg cursor-pointer ${style}`}
        >
          {children}
        </div>

        {/* Tooltip */}
        {isTooltipVisible && (
          <div
            className={`absolute bg-gray-800 text-white p-2 flex items-center justify-center rounded-md ${getPositionClass()} ${tooltipStyle}`}
          >
            {tooltip}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButton;
