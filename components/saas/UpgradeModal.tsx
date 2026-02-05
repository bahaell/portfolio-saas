"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface UpgradeModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upgrade to PRO</DialogTitle>
                    <DialogDescription>
                        Unlock unlimited portfolios, premium templates, and advanced customization.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 py-4">
                    <div className="grid grid-cols-1 gap-2 w-full">
                        <div className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors bg-card">
                            <h3 className="font-bold">PRO Plan</h3>
                            <p className="text-sm text-muted-foreground">$9.99 / month</p>
                            <ul className="text-xs mt-2 space-y-1 list-disc list-inside">
                                <li>5 Portfolios</li>
                                <li>Premium Styling</li>
                                <li>Analytics</li>
                            </ul>
                        </div>
                        <div className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors bg-card opacity-60">
                            <h3 className="font-bold">ELITE Plan</h3>
                            <p className="text-sm text-muted-foreground">$29.99 / month</p>
                            <p className="text-xs mt-1">Coming Soon</p>
                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <Button type="button" variant="secondary" disabled>
                        Payment Integration Coming Soon (Step 4.2)
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
