
using System;
using System.Collections.Generic;

public class Solution
{
    class TaskGroup
    {
        public int index;
        public List<int> profits = [];

        public int getProfit()
        {
            int profit = 0;
            if (index < profits.Count)
            {
                profit = profits[index];
                ++index;
            }
            return profit;
        }
    }

    public long MaxProfit(int[] workers, int[][] tasks)
    {
        Dictionary<int, TaskGroup> skillToSortedProfits = CreateMapSkillToSortedProfits(tasks);
        return CalculateMaxProfit(workers, skillToSortedProfits);
    }

    private long CalculateMaxProfit(int[] workers, Dictionary<int, TaskGroup> skillToSortedProfits)
    {

        long maxProfit = 0;
        foreach (int skill in workers)
        {
            if (skillToSortedProfits.ContainsKey(skill))
            {
                maxProfit += (long)skillToSortedProfits[skill].getProfit();
            }
        }

        int maxUnusedProfit = 0;
        foreach (int skill in skillToSortedProfits.Keys)
        {
            maxUnusedProfit = Math.Max(maxUnusedProfit, skillToSortedProfits[skill].getProfit());
        }

        maxProfit += maxUnusedProfit;
        return maxProfit;
    }

    private Dictionary<int, TaskGroup> CreateMapSkillToSortedProfits(int[][] tasks)
    {

        Dictionary<int, TaskGroup> skillToSortedProfits = [];
        foreach (int[] task in tasks)
        {
            int skill = task[0];
            int profit = task[1];

            skillToSortedProfits.TryAdd(skill, new TaskGroup());
            skillToSortedProfits[skill].profits.Add(profit);
        }

        foreach (TaskGroup taskGroup in skillToSortedProfits.Values)
        {
            taskGroup.profits.Sort(Comparer<int>.Create((xProfit, yProfit) => yProfit - xProfit));

        }

        return skillToSortedProfits;
    }
}
