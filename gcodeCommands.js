/**
 * Array of common G-code commands with descriptions for 3D printing and CNC machining.
 * 
 * This list is not exhaustive, as there are many machine-specific commands.
 */
const gcodeCommands = [
  {
    "command": "G0",
    "name": "Rapid Positioning",
    "description": "Move quickly to specified point. Often used for non-cutting moves in CNC or non-printing moves in 3D printing."
  },
  {
    "command": "G1",
    "name": "Linear Interpolation",
    "description": "Move in a straight line to the specified coordinates at a controlled feed rate."
  },
  {
    "command": "G2",
    "name": "Circular Interpolation, Clockwise",
    "description": "Move in an arc clockwise from the current point to a specified point, using an intermediate point (I, J, K)."
  },
  {
    "command": "G3",
    "name": "Circular Interpolation, Counterclockwise",
    "description": "Move in an arc counterclockwise from the current point to a specified point, using an intermediate point (I, J, K)."
  },
  {
    "command": "G4",
    "name": "Dwell",
    "description": "Pause the machine for a specified amount of time, often used for cooling or to allow material to set."
  },
  {
    "command": "G17",
    "name": "XY Plane Selection",
    "description": "Set the XY plane as the active plane for arc moves (G2, G3)."
  },
  {
    "command": "G18",
    "name": "XZ Plane Selection",
    "description": "Set the XZ plane as the active plane for arc moves (G2, G3)."
  },
  {
    "command": "G19",
    "name": "YZ Plane Selection",
    "description": "Set the YZ plane as the active plane for arc moves (G2, G3)."
  },
  {
    "command": "G20",
    "name": "Inch Units",
    "description": "Set the unit system to inches."
  },
  {
    "command": "G21",
    "name": "Millimeter Units",
    "description": "Set the unit system to millimeters."
  },
  {
    "command": "G28",
    "name": "Return to Home Position",
    "description": "Move to the machine's reference point (home position), optionally passing through specified coordinates."
  },
  {
    "command": "G90",
    "name": "Absolute Positioning",
    "description": "Returns to absolute coordinate mode, where movements are based on fixed coordinates from the machine's origin."
  },
  {
    "command": "G91",
    "name": "Relative Positioning",
    "description": "Switches coordinate system to relative mode, where movements are relative to the current position."
  },
  {
    "command": "G92",
    "name": "Coordinate System Offset",
    "description": "Set the current position to the specified coordinates without moving the machine. Useful for setting work offsets."
  },
  {
    "command": "M82",
    "name": "Absolute Extrusion",
    "description": "Sets the extruder back to absolute mode, where extrusion is measured from zero each time."
  },
  {
    "command": "M83",
    "name": "Relative Extrusion",
    "description": "Sets the extruder to relative mode, where extrusion amounts are relative to the current position."
  },
  {
    "command": "M104",
    "name": "Extruder Temperature Without Wait",
    "description": "Sets the extruder temperature without waiting for it to reach the set point. M104 S220 sets to 220°C."
  },
  {
    "command": "M106",
    "name": "Fan Speed",
    "description": "Controls the part cooling fan speed. M106 S127.5 sets the fan speed to half of its maximum."
  },
  {
    "command": "M107",
    "name": "Fan Off",
    "description": "Turn off the fan."
  },
  {
    "command": "M109",
    "name": "Extruder Temperature With Wait",
    "description": "Sets and waits for the extruder to reach the specified temperature before continuing. M109 S220 waits for 220°C."
  },
  {
    "command": "M140",
    "name": "Bed Temperature Without Wait",
    "description": "Sets the bed temperature without waiting for it to heat up. M140 S60 sets to 60°C."
  },
  {
    "command": "M190",
    "name": "Bed Temperature With Wait",
    "description": "Sets the bed temperature and waits for it to reach the set point before continuing. M190 S60 waits for 60°C."
  },
  {
    "command": "M220",
    "name": "Speed Percent",
    "description": "Adjusts the feed rate percentage. M220 S80 sets the speed to 80% of the normal speed."
  },
  {
    "command": "M290",
    "name": "Z-Offset Adjustment",
    "description": "Modifies the Z-axis offset. M290 Z-0.06 decreases the Z-offset by 0.06mm for fine-tuning print height."
  },
  {
    "command": "M420",
    "name": "Auto Leveling Control",
    "description": "Enables or disables automatic bed leveling. M420 S0 turns off auto leveling."
  },
  {
    "command": "G29",
    "name": "Auto Bed Leveling",
    "description": "Perform an automatic bed leveling procedure, which probes the bed to adjust for any unevenness."
  },
  {
    "command": "G32",
    "name": "Bed Calibration",
    "description": "Often used in some printers to calibrate the bed leveling, might differ in function across printer models."
  },
  {
    "command": "G33",
    "name": "Delta Calibration",
    "description": "For delta printers, this command helps calibrate the endstops for accurate delta motion."
  },
  {
    "command": "G60",
    "name": "Save Current Position",
    "description": "Saves the current position of all axes into memory, which can be recalled later with G61."
  },
  {
    "command": "G61",
    "name": "Return to Saved Position",
    "description": "Moves back to the position saved by G60."
  },
  {
    "command": "M84",
    "name": "Stepper Motors Off",
    "description": "Disable stepper motors to reduce power consumption when idle."
  },
  {
    "command": "M92",
    "name": "Set Axis Steps-per-unit",
    "description": "Set the steps per millimeter for each axis, useful for recalibrating or adjusting firmware settings."
  },
  {
    "command": "M117",
    "name": "Display Message",
    "description": "Show a message on the printer's LCD screen. Example: M117 Printing..."
  },
  {
    "command": "M204",
    "name": "Acceleration Settings",
    "description": "Set acceleration parameters for printing and travel moves. M204 P1500 R3000 for print and retract acceleration."
  },
  {
    "command": "M500",
    "name": "Save Settings",
    "description": "Save current settings to EEPROM, ensuring they persist after power cycles."
  },
  {
    "command": "M501",
    "name": "Load Settings",
    "description": "Load settings from EEPROM, restoring previously saved configurations."
  },
  {
    "command": "M502",
    "name": "Reset to Defaults",
    "description": "Reset all settings to their default values as defined in the firmware."
  },
  // Bambu Lab Specific Commands
  {
    "command": "M1004",
    "name": "Bambu LED Control",
    "description": "Control the RGB LED strip on Bambu Lab printers. M1004 S1 L0 R255 G0 B0 sets LED 0 to red."
  },
  {
    "command": "M1005",
    "name": "Bambu Fan Speed Control",
    "description": "Adjust auxiliary fan speed on Bambu printers. M1005 S255 sets the fan to max speed."
  },
  {
    "command": "M1006",
    "name": "Bambu AMS Filament Change",
    "description": "Command for changing filament in the AMS (Automatic Material System). M1006 T0 C0 changes to color 0 in AMS slot 0."
  },
  {
    "command": "M1007",
    "name": "Bambu AMS Filament Unload",
    "description": "Unload filament from the AMS. M1007 T0 would unload from AMS slot 0."
  },
  {
    "command": "M1008",
    "name": "Bambu Nozzle Wipe",
    "description": "Perform a nozzle wipe on Bambu printers to clean the nozzle. M1008 P1 for one wipe."
  },
  {
    "command": "M1009",
    "name": "Bambu Print Pause",
    "description": "Pause the current print job. M1009 will pause the printer."
  },
  {
    "command": "M1010",
    "name": "Bambu Print Resume",
    "description": "Resume a paused print job. M1010 resumes printing."
  },
  {
    "command": "M203",
    "name": "Maximum Feedrate",
    "description": "Set the maximum feedrate for each axis. M203 X200 Y200 Z10 sets the max feedrate for X, Y, and Z axes."
  },
  {
    "command": "M205",
    "name": "Advanced Settings",
    "description": "Adjust advanced motion settings like jerk. M205 X10 Y10 sets jerk limits for X and Y axes."
  },
  {
    "command": "M206",
    "name": "Offset Coordinates",
    "description": "Set offsets for the axes to adjust coordinate positions. M206 X10 shifts the X-axis origin by 10mm."
  },
  {
    "command": "M209",
    "name": "Enable Auto Retract",
    "description": "Enable firmware-controlled retraction for filament movement. M209 S1 enables auto retract."
  },
  {
    "command": "M226",
    "name": "G-code Pause",
    "description": "Pause the print until a specified action is completed, like pressing a button."
  },
  {
    "command": "M300",
    "name": "Play Beep Sound",
    "description": "Make the printer beep using a tone. M300 S440 P200 plays a 440Hz tone for 200ms."
  },
  {
    "command": "M301",
    "name": "Set PID for Hotend",
    "description": "Adjust PID parameters for the hotend. M301 P22.2 I1.08 D114 sets the proportional, integral, and derivative terms."
  },
  {
    "command": "M302",
    "name": "Cold Extrusion Allowance",
    "description": "Allow extrusion when the nozzle is below the minimum extrusion temperature. M302 S0 disables the safety check."
  },
  {
    "command": "M303",
    "name": "PID Auto-tune",
    "description": "Run PID auto-tuning for the hotend or bed. M303 E0 S200 performs auto-tuning on the hotend at 200°C."
  },
  {
    "command": "M850",
    "name": "Set Probe Offset",
    "description": "Set the offset of the Z-probe from the nozzle. M850 Z-1.5 sets a Z-offset of -1.5mm."
  },
  {
    "command": "G10",
    "name": "Tool Offset",
    "description": "Set tool offsets for multi-tool setups. G10 P1 X10 Y10 sets an offset for tool 1."
  },
  {
    "command": "G11",
    "name": "Unretract",
    "description": "Reverse the retraction of filament previously retracted with G10."
  },
  {
    "command": "G34",
    "name": "Z Steppers Alignment",
    "description": "Automatically align multiple Z steppers to level the bed. Often used in printers with independent Z motors."
  },
  {
    "command": "G92.1",
    "name": "Reset Axis Offset",
    "description": "Reset any offsets applied using G92."
  },
  {
    "command": "M603",
    "name": "Set Filament Load Length",
    "description": "Adjust the length of filament loaded into the extruder. M603 L200 sets the load length to 200mm."
  },
  {
    "command": "M701",
    "name": "Load Filament",
    "description": "Initiate filament loading on printers that support it. M701 starts the loading process."
  },
  {
    "command": "M702",
    "name": "Unload Filament",
    "description": "Initiate filament unloading on printers that support it. M702 starts the unloading process."
  },
  {
    "command": "M605",
    "name": "Multi-extruder Mode",
    "description": "Set the mode for multi-extruder setups. M605 S2 enables duplication mode for dual extruders."
  }
];


window.gcodeCommands = gcodeCommands;
