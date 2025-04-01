
import React, { useState } from 'react';
import { CustomerGroup } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, Plus, Save, Trash2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CustomerGroupsProps {
  initialGroups: CustomerGroup[];
}

export function CustomerGroups({ initialGroups }: CustomerGroupsProps) {
  const { toast } = useToast();
  const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>(initialGroups);
  const [selectedGroup, setSelectedGroup] = useState<CustomerGroup | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSelectGroup = (group: CustomerGroup) => {
    setSelectedGroup(group);
    setIsAddingNew(false);
  };

  const handlePromptChange = (value: string) => {
    if (selectedGroup) {
      setSelectedGroup({ ...selectedGroup, prompt: value });
    }
  };

  const handleSaveGroup = () => {
    if (isAddingNew && newGroupName.trim()) {
      const newGroup = {
        id: Date.now().toString(),
        name: newGroupName.trim(),
        prompt: '',
      };
      setCustomerGroups([...customerGroups, newGroup]);
      setSelectedGroup(newGroup);
      setNewGroupName('');
      setIsAddingNew(false);
      toast({
        title: "Group Added",
        description: `Group "${newGroupName}" has been added.`,
      });
    } else if (selectedGroup) {
      setCustomerGroups(
        customerGroups.map(group => 
          group.id === selectedGroup.id ? selectedGroup : group
        )
      );
      toast({
        title: "Group Updated",
        description: `Group "${selectedGroup.name}" has been updated.`,
      });
    }
  };

  const handleDeleteGroup = () => {
    if (selectedGroup) {
      setCustomerGroups(
        customerGroups.filter(group => group.id !== selectedGroup.id)
      );
      setSelectedGroup(null);
      toast({
        title: "Group Deleted",
        description: `Group "${selectedGroup.name}" has been deleted.`,
      });
    }
  };

  const startAddingNew = () => {
    setIsAddingNew(true);
    setSelectedGroup(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Groups</CardTitle>
        <CardDescription>
          Manage groups and customize AI responses for each
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedGroup ? selectedGroup.name : 'Select a customer group'}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {customerGroups.map(group => (
                  <DropdownMenuItem
                    key={group.id}
                    onClick={() => handleSelectGroup(group)}
                  >
                    {group.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="icon"
              onClick={startAddingNew}
              className="ml-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {isAddingNew && (
            <div className="space-y-2">
              <Label htmlFor="new-group-name">New Group Name</Label>
              <div className="flex space-x-2">
                <Input
                  id="new-group-name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name"
                />
                <Button
                  onClick={handleSaveGroup}
                  disabled={!newGroupName.trim()}
                  size="sm"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          )}

          {selectedGroup && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="group-prompt">Custom AI Prompt</Label>
                <Textarea
                  id="group-prompt"
                  value={selectedGroup.prompt}
                  onChange={(e) => handlePromptChange(e.target.value)}
                  placeholder="For property managers: Handle inquiries with a focus on efficiency. Prioritize maintenance issues, respond to tenant concerns with empathy, and provide clear timelines. For urgent matters related to building safety or essential services, escalate immediately and offer temporary solutions when possible."
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This prompt will be used to guide the AI when processing emails from this customer group.
                </p>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="destructive"
                  onClick={handleDeleteGroup}
                  size="sm"
                  className="w-auto h-9 px-3"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Group
                </Button>

                <Button
                  onClick={handleSaveGroup}
                  size="sm"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
