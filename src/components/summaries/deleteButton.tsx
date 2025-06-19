"use client"
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog" 
import { useState, useTransition } from 'react';
import { DeleteSummaryAction } from '@/actions/summaryActions';
import { toast } from 'sonner';

interface DeleteButtonProps {
    summaryId: string;
}


const DeleteButton = ({summaryId}:DeleteButtonProps) => {
    const [open, setOpen] = useState(false); 
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition( async () => {
            const result = await DeleteSummaryAction(summaryId);
            if(!result.success) {
                toast.error("Failed to delete summary. Please try again.");
            }
            setOpen(false);
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className='text-gray-500 bg-gray-50 border border-gray-200 hover:text-red-600 hover:bg-red-100 hover:scale-110'>
                <Trash2 className='w-4 h-4'/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Delete Summary</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete this summary? This action cannot be undone.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant={"ghost"} className='px-2 bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100'
                    onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button variant={"destructive"} className=' bg-red-600 border border-gray-200 hover:bg-red-500'
                    onClick={() => {handleDelete()}}
                >
                    {isPending ? "Deleting..." : "Delete"}
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}

export default DeleteButton;