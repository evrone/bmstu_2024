const ALLOWED_DOMAINS = [
    '.vk.com',
    '.vk.ru'
];
const isDomainAllowed = (origin)=>!!ALLOWED_DOMAINS.find((domain)=>origin.endsWith(domain));

export { isDomainAllowed };
