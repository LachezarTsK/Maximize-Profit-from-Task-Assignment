
#include <span>
#include <ranges> 
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

class Solution {

    struct TaskGroup {

        int index = 0;
        vector<int> profits;

        int getProfit() {
            int profit = 0;
            if (index < profits.size()) {
                profit = profits[index];
                ++index;
            }
            return profit;
        }
    };

public:
    long long maxProfit(const vector<int>& workers, const vector<vector<int>>& tasks) const {
        unordered_map<int, TaskGroup> skillToSortedProfits = createMapSkillToSortedProfits(tasks);
        return calculateMaxProfit(workers, skillToSortedProfits);
    }

private:
    long long calculateMaxProfit(const vector<int>& workers, unordered_map<int, TaskGroup>& skillToSortedProfits) const {

        long long maxProfit = 0;
        for (const auto& skill : workers) {
            if (skillToSortedProfits.contains(skill)) {
                maxProfit += skillToSortedProfits[skill].getProfit();
            }
        }

        int maxUnusedProfit = 0;
        for (auto& [skill, TaskGroup] : skillToSortedProfits) {
            maxUnusedProfit = max(maxUnusedProfit, skillToSortedProfits[skill].getProfit());
        }

        maxProfit += maxUnusedProfit;
        return maxProfit;
    }

    unordered_map<int, TaskGroup> createMapSkillToSortedProfits(span<const vector<int>> tasks) const {

        unordered_map<int, TaskGroup> skillToSortedProfits;
        for (const auto& task : tasks) {
            int skill = task[0];
            int profit = task[1];
            skillToSortedProfits[skill].profits.push_back(profit);
        }

        for (auto& [skill, taskGroup] : skillToSortedProfits) {
            ranges::sort(taskGroup.profits, [](int xProfit, int yProfit) {return yProfit < xProfit; });
        }

        return skillToSortedProfits;
    }
};
