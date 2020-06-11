import React from "react";
import ChipInput from "material-ui-chip-input";




const ChipInputGroup = ({ onChange, value }) => {
    return (
        <ChipInput
            className="chipInput"
            value={value}
            onAdd={(chip) => onChange.handleAddChip(chip)}
            onDelete={(chip, index) => onChange.handleDeleteChip(chip, index)}
        />
    );
};
export default ChipInputGroup;