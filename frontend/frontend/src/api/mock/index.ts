/**
 * Mock API Layer — patches all *Api objects with in-memory mock implementations.
 *
 * Call `enableMocks()` once in main.tsx before the app renders.
 * To switch to the real backend, set VITE_USE_MOCKS=false in .env.local.
 */

import { authApi } from "../auth/auth.api";
import { userApi } from "../user/user.api";
import { dashboardApi } from "../dashboard/dashboard.api";
import { researchApi } from "../research/research.api";
import { pipelineApi } from "../pipeline/pipeline.api";
import { teamApi } from "../team/team.api";
import { chatApi } from "../chat/chat.api";
import { billingApi } from "../billing/billing.api";
import { apiKeysApi } from "../api-keys/api-keys.api";

import { mockAuthApi } from "./mock.auth";
import { mockUserApi } from "./mock.user";
import { mockDashboardApi } from "./mock.dashboard";
import { mockResearchApi } from "./mock.research";
import { mockPipelineApi } from "./mock.pipeline";
import { mockTeamApi } from "./mock.team";
import { mockChatApi } from "./mock.chat";
import { mockBillingApi } from "./mock.billing";
import { mockApiKeysApi } from "./mock.api-keys";

export function enableMocks(): void {
  Object.assign(authApi, mockAuthApi);
  Object.assign(userApi, mockUserApi);
  Object.assign(dashboardApi, mockDashboardApi);
  Object.assign(researchApi, mockResearchApi);
  Object.assign(pipelineApi, mockPipelineApi);
  Object.assign(teamApi, mockTeamApi);
  Object.assign(chatApi, mockChatApi);
  Object.assign(billingApi, mockBillingApi);
  Object.assign(apiKeysApi, mockApiKeysApi);

  console.log(
    "%c🚀 LaunchPilot Mock API enabled %c— all requests use in-memory data",
    "color: #4f6ef7; font-weight: bold; font-size: 13px",
    "color: #8888a0; font-size: 12px"
  );
}
