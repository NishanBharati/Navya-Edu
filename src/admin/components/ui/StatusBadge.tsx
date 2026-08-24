import React from 'react';
import { Badge } from '../../../components/common/Badge';
import type { InquiryStatus } from '../../../types';

const STATUS_VARIANT: Record<InquiryStatus, 'blue' | 'amber' | 'sage' | 'neutral'> = {
  New: 'blue',
  Contacted: 'amber',
  Enrolled: 'sage',
  Closed: 'neutral',
};

export const STATUS_OPTIONS: InquiryStatus[] = ['New', 'Contacted', 'Enrolled', 'Closed'];

interface StatusBadgeProps {
  status: InquiryStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => (
  <Badge variant={STATUS_VARIANT[status]} size={size}>
    {status}
  </Badge>
);
