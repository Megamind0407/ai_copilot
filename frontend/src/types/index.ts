export interface AnalyzeRequest {
  log_text: string;
  stack_trace: string;
  code_snippet?: string;
}

export interface ParsedError {
  error_type: string;
  error_message: string;
  file_name: string;
  line_number: string;
}

export interface Analysis {
  source: 'rule_engine' | 'llm_router';
  root_cause: string;
  fix_suggestion: string;
  confidence: number;
}

export interface Validation {
  approved: boolean;
  reason: string;
}

export interface TestResult {
  passed: boolean;
  output: string;
  error: string;
}

export interface Testing {
  test_code: string;
  test_result: TestResult;
}

export interface AnalyzeResponse {
  status: string;
  parsed_error: ParsedError;
  analysis: Analysis;
  validation: Validation;
  testing: Testing;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  request: AnalyzeRequest;
  response: AnalyzeResponse;
}
