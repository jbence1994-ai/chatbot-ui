import { Skeleton } from '@/components/ui/skeleton.tsx';

const MessageSkeleton = () => {
  return (
    <div className="flex items-start gap-2">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-4 w-[140px]" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
