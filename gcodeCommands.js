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
  }
];

// Attach gcodeCommands to the global scope
window.gcodeCommands = gcodeCommands;
