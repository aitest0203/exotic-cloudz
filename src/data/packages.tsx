import { Wind, Flame, Crown } from 'lucide-react';
import type { Package } from '../types';

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'The Cloud Starter',
    price: '$150',
    description: 'Perfect for small gatherings. 2 Hours.',
    features: ['3 Premium Hookahs', 'Unlimited Coals', '2 Flavor Choices', '1 Attendant'],
    icon: <Wind className="w-8 h-8 text-blue-400" />,
  },
  {
    id: 'party',
    name: 'The Social Vibe',
    price: '$300',
    description: 'Our most popular package. 3 Hours.',
    features: ['6 Premium Hookahs', 'Unlimited Coals & Tips', '4 Flavor Choices', 'LED Base Lights', '1 Attendant'],
    icon: <Flame className="w-8 h-8 text-cyan-400" />,
  },
  {
    id: 'king',
    name: 'The Event King',
    price: '$600+',
    description: 'Full service for weddings/events. 4+ Hours.',
    features: ['10+ Hookahs', 'Custom Fruit Heads', 'Unlimited Everything', '2 Attendants', 'VIP Setup'],
    icon: <Crown className="w-8 h-8 text-yellow-400" />,
  },
];

export const WORKSPACE_DASHBOARD = 'https://workspace.google.com/dashboard';
export const LOGO_SRC = '/Exotic Clouds.png';
