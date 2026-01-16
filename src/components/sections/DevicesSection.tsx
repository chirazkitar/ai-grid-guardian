import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StatusDot } from "@/components/ui/StatusDot";
import { Chip } from "@/components/ui/Chip";
import { 
  Thermometer, 
  Droplets, 
  Home, 
  Lightbulb, 
  Wind, 
  Tv, 
  Refrigerator,
  Car,
  Flame,
  Speaker,
  Sun,
  CloudRain,
  Blinds,
  Power,
  Zap,
  Gauge,
  Leaf,
  LucideIcon
} from "lucide-react";

interface Device {
  id: string;
  name: string;
  status: string;
  icon: LucideIcon;
  isOn: boolean;
  value?: number;
  unit?: string;
  color?: string;
}

interface Room {
  id: string;
  name: string;
  icon: LucideIcon;
  temperature?: number;
  humidity?: number;
  devices: Device[];
}

const rooms: Room[] = [
  {
    id: 'living',
    name: 'Living Room',
    icon: Tv,
    temperature: 22.8,
    humidity: 57,
    devices: [
      { id: 'floor-lamp', name: 'Floor lamp', status: '70%', icon: Lightbulb, isOn: true, value: 70, color: 'warning' },
      { id: 'spotlights', name: 'Spotlights', status: '49%', icon: Lightbulb, isOn: true, value: 49, color: 'warning' },
      { id: 'bar-lamp', name: 'Bar lamp', status: 'On', icon: Lightbulb, isOn: true, color: 'warning' },
      { id: 'blinds', name: 'Blinds', status: 'Open · 100%', icon: Blinds, isOn: true },
      { id: 'nest-mini', name: 'Nest mini', status: 'Playing', icon: Speaker, isOn: true, color: 'info' },
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: Refrigerator,
    devices: [
      { id: 'shutter', name: 'Shutter', status: 'Open · 100%', icon: Blinds, isOn: true },
      { id: 'spotlights-k', name: 'Spotlights', status: 'Off', icon: Lightbulb, isOn: false },
      { id: 'worktop', name: 'Worktop', status: 'Off', icon: Lightbulb, isOn: false },
      { id: 'fridge', name: 'Fridge', status: 'Closed', icon: Refrigerator, isOn: true, color: 'info' },
      { id: 'nest-audio', name: 'Nest Audio', status: 'On', icon: Speaker, isOn: true },
    ]
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: Zap,
    devices: [
      { id: 'ev', name: 'EV', status: 'Unplugged', icon: Car, isOn: false },
      { id: 'last-charge', name: 'Last charge', status: '16.3 kWh', icon: Zap, isOn: true, color: 'accent' },
      { id: 'home-power', name: 'Home power', status: '797.86 W', icon: Power, isOn: true, color: 'warning' },
      { id: 'voltage', name: 'Voltage', status: '232.19 V', icon: Gauge, isOn: true },
      { id: 'fossil-fuel', name: 'Fossil fuel', status: '9.84%', icon: Flame, isOn: true, color: 'warning' },
      { id: 'co2', name: 'CO2 Intensity', status: '62.0 gCO2eq/k...', icon: Leaf, isOn: true },
    ]
  },
  {
    id: 'climate',
    name: 'Climate',
    icon: Thermometer,
    devices: [
      { id: 'sun', name: 'Sun', status: 'Above horizon', icon: Sun, isOn: true, color: 'warning' },
      { id: 'rain', name: 'Rain', status: '7.2 mm', icon: CloudRain, isOn: true, color: 'info' },
      { id: 'downstairs', name: 'Downstairs', status: 'Comfort · 20.8...', icon: Thermometer, isOn: true, color: 'warning' },
      { id: 'upstairs', name: 'Upstairs', status: 'Comfort · 21.7...', icon: Thermometer, isOn: true, color: 'warning' },
    ]
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    icon: Home,
    devices: [
      { id: 'door-light', name: 'Door light', status: '100%', icon: Lightbulb, isOn: true, value: 100, color: 'warning' },
      { id: 'flood-light', name: 'Flood light', status: 'Off', icon: Lightbulb, isOn: false },
      { id: 'motion', name: 'Motion', status: 'Clear', icon: Wind, isOn: true },
    ]
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 }
};

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
}

function DeviceCard({ device, onToggle }: DeviceCardProps) {
  const Icon = device.icon;
  const colorClass = device.color || 'muted-foreground';
  
  return (
    <motion.button
      variants={item}
      onClick={() => onToggle(device.id)}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left w-full group ${
        device.isOn 
          ? 'bg-white/[0.06] border-white/[0.08] hover:bg-white/[0.08]' 
          : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.04]'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
        device.isOn 
          ? device.color === 'warning' ? 'bg-warning/20 text-warning' 
          : device.color === 'accent' ? 'bg-accent/20 text-accent'
          : device.color === 'info' ? 'bg-primary/20 text-primary'
          : 'bg-white/[0.08] text-foreground'
          : 'bg-white/[0.04] text-muted-foreground'
      }`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-xs font-medium truncate ${device.isOn ? 'text-foreground' : 'text-muted-foreground'}`}>
          {device.name}
        </div>
        <div className="text-[10px] text-muted-foreground truncate">
          {device.status}
        </div>
      </div>
    </motion.button>
  );
}

interface RoomCardProps {
  room: Room;
  onDeviceToggle: (deviceId: string) => void;
}

function RoomCard({ room, onDeviceToggle }: RoomCardProps) {
  const Icon = room.icon;
  const activeCount = room.devices.filter(d => d.isOn).length;
  
  return (
    <GlassPanel className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">{room.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          {room.temperature && (
            <Chip className="text-[10px] px-2 py-0.5">
              <Thermometer className="w-3 h-3 text-warning mr-1" />
              {room.temperature}°C
            </Chip>
          )}
          {room.humidity && (
            <Chip className="text-[10px] px-2 py-0.5">
              <Droplets className="w-3 h-3 text-primary mr-1" />
              {room.humidity}%
            </Chip>
          )}
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 gap-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {room.devices.map(device => (
          <DeviceCard 
            key={device.id} 
            device={device} 
            onToggle={onDeviceToggle}
          />
        ))}
      </motion.div>
      
      <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">
          {activeCount} of {room.devices.length} active
        </span>
        <StatusDot status={activeCount > 0 ? 'good' : 'info'} />
      </div>
    </GlassPanel>
  );
}

interface DevicesSectionProps {
  onToast: (message: string) => void;
}

export function DevicesSection({ onToast }: DevicesSectionProps) {
  const handleDeviceToggle = (deviceId: string) => {
    onToast(`Demo: Toggled ${deviceId}`);
  };

  const totalDevices = rooms.reduce((acc, room) => acc + room.devices.length, 0);
  const activeDevices = rooms.reduce((acc, room) => acc + room.devices.filter(d => d.isOn).length, 0);
  
  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <motion.div 
        className="flex items-center justify-center gap-3 flex-wrap"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Chip className="px-4 py-2">
          <Thermometer className="w-3.5 h-3.5 text-warning mr-2" />
          10.5 °C
        </Chip>
        <Chip className="px-4 py-2">
          <Droplets className="w-3.5 h-3.5 text-primary mr-2" />
          70.4%
        </Chip>
        <Chip className="px-4 py-2">
          <Home className="w-3.5 h-3.5 text-muted-foreground mr-2" />
          Away
        </Chip>
      </motion.div>

      {/* Summary Stats */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassPanel className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{rooms.length}</div>
          <div className="text-xs text-muted-foreground">Rooms</div>
        </GlassPanel>
        <GlassPanel className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{totalDevices}</div>
          <div className="text-xs text-muted-foreground">Devices</div>
        </GlassPanel>
        <GlassPanel className="p-4 text-center">
          <div className="text-2xl font-bold text-accent">{activeDevices}</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </GlassPanel>
        <GlassPanel className="p-4 text-center">
          <div className="text-2xl font-bold text-warning">797 W</div>
          <div className="text-xs text-muted-foreground">Power</div>
        </GlassPanel>
      </motion.div>

      {/* Room Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            variants={item}
            transition={{ delay: index * 0.1 }}
          >
            <RoomCard room={room} onDeviceToggle={handleDeviceToggle} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
