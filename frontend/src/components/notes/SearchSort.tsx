import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { Search,SortAsc } from "lucide-react";
import { div } from "framer-motion/client";

interface SearchSortProps {
    searchQuery:string;
    setSearchQuery:(query:string)=>void;
    sortOrder:'asc'|'desc';
    setSortOrder:(order:'asc'|'desc')=>void;
}

export const SearchSort:React.FC<SearchSortProps> = ({searchQuery,setSearchQuery,sortOrder,setSortOrder})=>{
    return(
        <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                <Input placeholder="Search notes" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
            </div>
            <Button variant="outline" onClick={()=>setSortOrder(sortOrder === 'asc'?'desc':'asc')} className="flex gap-2">
                <SortAsc className="h-4 w-4"/>
                {sortOrder === 'asc' ? 'Newest' : 'Oldest'}
            </Button>
        </div>
    )
}