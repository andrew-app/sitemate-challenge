import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Issue } from "./IssueTypes";


  
const fetchIssues: () => Promise<Issue[]> = async () => {
    const response = await axios.get('api/v1/issues');
    return response.data.issues;
}

export const GetExistingIssues = () => useQuery(['existingIssues'], fetchIssues, { staleTime: 1000 * 3 });