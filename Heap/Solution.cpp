
#include <span>
#include <queue>
#include <vector>
#include <algorithm>
#include <unordered_map>

class Solution {

public:
    long long maxProfit(const vector<int>& workers, const vector<vector<int>>& tasks) const {
        unordered_map<int, priority_queue<int>> skillToProfits = createMapSkillToProfits(tasks);
        return calculateMaxProfit(workers, skillToProfits);
    }

private:
    long long calculateMaxProfit(span<const int> workers, unordered_map<int, priority_queue<int>>& skillToProfits) const {
        long long maxProfit = 0;
        for (const auto& skill : workers) {
            if (!skillToProfits.contains(skill)) {
                continue;
            }
            maxProfit += skillToProfits[skill].top();
            skillToProfits[skill].pop();
            if (skillToProfits[skill].empty()) {
                skillToProfits.erase(skill);
            }
        }

        int maxUnusedProfit = 0;
        for (const auto& [skill, profits] : skillToProfits) {
            maxUnusedProfit = max(maxUnusedProfit, profits.top());
        }

        maxProfit += maxUnusedProfit;
        return maxProfit;
    }

    unordered_map<int, priority_queue<int>> createMapSkillToProfits(span<const vector<int>> tasks) const {
        unordered_map<int, priority_queue<int>> skillToProfits;
        for (const auto& task : tasks) {
            int skill = task[0];
            int profit = task[1];
            skillToProfits[skill].push(profit);
        }

        return skillToProfits;
    }
};
