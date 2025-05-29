
using System;
using System.Collections.Generic;

public class Solution
{
    public long MaxProfit(int[] workers, int[][] tasks)
    {
        Dictionary<int, PriorityQueue<int, int>> skillToProfits = CreateMapSkillToProfits(tasks);
        return CalculateMaxProfit(workers, skillToProfits);
    }

    private long CalculateMaxProfit(int[] workers, Dictionary<int, PriorityQueue<int, int>> skillToProfits)
    {
        long maxProfit = 0;
        foreach (int skill in workers)
        {
            if (!skillToProfits.ContainsKey(skill))
            {
                continue;
            }
            maxProfit += skillToProfits[skill].Dequeue();
            if (skillToProfits[skill].Count == 0)
            {
                skillToProfits.Remove(skill);
            }
        }

        int maxUnusedProfit = 0;
        foreach (int skill in skillToProfits.Keys)
        {
            maxUnusedProfit = Math.Max(maxUnusedProfit, skillToProfits[skill].Dequeue());
        }

        maxProfit += maxUnusedProfit;
        return maxProfit;
    }

    private Dictionary<int, PriorityQueue<int, int>> CreateMapSkillToProfits(int[][] tasks)
    {
        Dictionary<int, PriorityQueue<int, int>> skillToProfits = [];
        foreach (int[] task in tasks)
        {
            int skill = task[0];
            int profit = task[1];

            skillToProfits.TryAdd(skill, new PriorityQueue<int, int>(Comparer<int>.Create((xProfit, yProfit) => yProfit - xProfit)));
            skillToProfits[skill].Enqueue(profit, profit);
        }

        return skillToProfits;
    }
}
