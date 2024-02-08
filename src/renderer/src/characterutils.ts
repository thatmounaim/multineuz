type Character = {
  id: string
  label: string
  job: string
}
type Job = {
  label: string
}
const JobsDictionary: Record<string, Job> = {
  vagrant: { label: 'Vagrant' },
  assist: { label: 'Assist' },
  ringmaster: { label: 'Ringmaster' },
  billposter: { label: 'Billposter' },
  acrobat: { label: 'Acrobat' },
  ranger: { label: 'Ranger' },
  jester: { label: 'Jester' },
  mercenary: { label: 'Mercenary' },
  blade: { label: 'Blade' },
  knight: { label: 'Knight' },
  magician: { label: 'Magician' },
  psykeeper: { label: 'Psykeeper' },
  elementor: { label: 'Elementor' }
}

const Jobs = Object.keys(JobsDictionary)
function getJobName(jobId: string): string {
  const job = JobsDictionary[jobId]
  if (job) return job.label
  return jobId
}
export { Jobs, JobsDictionary, getJobName }
export type { Character, Job }
