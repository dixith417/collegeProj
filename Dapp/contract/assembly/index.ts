import { logging, PersistentMap } from "near-sdk-as";

const CandidateURL = new PersistentMap<string, string>("CandidateURL");
const Candidates = new PersistentMap<string, string[]>("Candidates");
const PromptArray = new PersistentMap<string, string[]>("array of prompts");
const VoteArray = new PersistentMap<string, i32[]>("stores votes");
const userParticipation = new PersistentMap<string, string[]>(
  "user Participation Record"
);

/**
 * View Methods
 * Does not changes state of Blockchain
 * Does not incur a fee
 * Pulls and reads information from blockchain
 */

export function getUrl(name: string): string {
  if (CandidateURL.contains(name)) {
    return CandidateURL.getSome(name);
  } else {
    logging.log(`can't find that user`);
    return "";
  }
}

export function didParticipate(prompt: string, user: string): bool {
  if (userParticipation.contains(prompt)) {
    let getArray = userParticipation.getSome(prompt);
    return getArray.includes(user);
  } else {
    logging.log("prompt not found");
    return false;
  }
}

export function getAllPrompts(): string[] {
  if (PromptArray.contains("AllArrays")) {
    return PromptArray.getSome("AllArrays");
  } else {
    logging.log("no prompts found");
    return [];
  }
}

export function getVotes(prompt: string): i32[] {
  if (VoteArray.contains(prompt)) {
    return VoteArray.getSome(prompt);
  } else {
    logging.log("prompt not found for this vote");
    return [0, 0, 0, 0];
  }
}

export function getCandidateList(prompt: string): string[] {
  if (Candidates.contains(prompt)) {
    return Candidates.getSome(prompt);
  } else {
    logging.log("prompt not found");
    return [];
  }
}

/**
 * Change Methods
 * Changes state of Blockchain
 * Costs a transaction fee to do so
 * Adds or modifies information to blockchain
 */

export function addUrl(name: string, url: string): void {
  CandidateURL.set(name, url);
  logging.log("added url for " + name);
}

export function setCandidateList(
  prompt: string,
  name1: string,
  name2: string,
  name3: string,
  name4: string
): void {
  Candidates.set(prompt, [name1, name2, name3, name4]);
  logging.log(
    "Added candidates:" + name1 + " " + name2 + " " + name3 + " " + name4
  );
}

export function addToPromptArray(prompt: string): void {
  logging.log("added to prompt array");

  if (PromptArray.contains("AllArrays")) {
    logging.log("add addition to prompt array");
    let tempArr = PromptArray.getSome("AllArrays");
    tempArr.push(prompt);
    PromptArray.set("AllArrays", tempArr);
  } else {
    PromptArray.set("AllArrays", [prompt]);
  }
}

export function clearPromptArray(): void {
  logging.log("clearing Poll data...");
  PromptArray.delete("AllArrays");
  Candidates.delete("Candidates");
  VoteArray.delete("stores votes");
  userParticipation.delete("user Participation Record");
  CandidateURL.delete("CandidateURL");
  logging.log("All Data Cleared!");
}

export function addVote(prompt: string, index: i32): void {
  logging.log(prompt);
  // logging.log(index);
  if (VoteArray.contains(prompt)) {
    let tempArr = VoteArray.getSome(prompt);
    let tempVal = tempArr[index];
    let newVal = tempVal + 1;
    tempArr[index] = newVal;
    VoteArray.set(prompt, tempArr);
  } else {
    let newArr = [0, 0, 0, 0];
    newArr[index] = 1;
    VoteArray.set(prompt, newArr);
  }
}

export function recordUser(prompt: string, user: string): void {
  if (userParticipation.contains(prompt)) {
    let tempArr = userParticipation.getSome(prompt);
    tempArr.push(user);
    userParticipation.set(prompt, tempArr);
  } else {
    userParticipation.set(prompt, [user]);
  }
}
