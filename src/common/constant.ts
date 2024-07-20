import { ELevel, EStatus, EType } from 'src/database/entities';

export const Tags = {
  HEALTH: 'Health',
  COMMON: 'Common',
};

export enum NodeEnv {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export const apiVersion = '1';

export enum ConnectionName {
  GENERAL = 'General',
}

export const DATA_SOURCE = 'DATA_SOURCE';

export const statusMessages = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'NonAuthoritativeInfo',
  204: 'NoContent',
  205: 'ResetContent',
  206: 'PartialContent',
};

export const HOLIDAYS = [
  {
    date: '02-12-2024',
    title: 'Holiday 1',
    type: 'REGULAR',
  },
  {
    date: '05-02-2024',
    title: 'Holiday 2',
    type: 'FLOATER',
  },
];

export const departments = ['MEAN', 'FLUTTER', 'MERN', 'DEVOPS', 'QA', 'UIUX'];

export const primarySkills = {
  MEAN: [
    {
      category: 'Typescript',
      skills: [
        'Types',
        'OOP',
        'Interface',
        'Typecast',
        'Abstract Class',
        'Simple Class',
      ],
    },
    {
      category: 'Javascript',
      skills: ['ES5', 'ES6', 'DOM', 'Events', 'Functional Programming'],
    },
    {
      category: 'MongoDB',
      skills: [
        'CRUD Operations',
        'Aggregation',
        'Indexes',
        'Replication',
        'Sharding',
      ],
    },
    {
      category: 'Express.js',
      skills: [
        'Middleware',
        'Routing',
        'Error Handling',
        'Authentication',
        'Validation',
      ],
    },
    {
      category: 'Angular',
      skills: [
        'Components',
        'Services',
        'Directives',
        'Pipes',
        'Dependency Injection',
      ],
    },
    {
      category: 'Node.js',
      skills: [
        'Modules',
        'Async Programming',
        'File System',
        'Streams',
        'Event Loop',
      ],
    },
  ],

  FLUTTER: [
    {
      category: 'Dart',
      skills: [
        'Types',
        'OOP',
        'Asynchronous Programming',
        'Functional Programming',
        'Error Handling',
      ],
    },
    {
      category: 'Flutter Widgets',
      skills: [
        'StatelessWidget',
        'StatefulWidget',
        'InheritedWidget',
        'Layout Widgets',
        'Input Widgets',
      ],
    },
    {
      category: 'State Management',
      skills: ['Provider', 'Bloc', 'Riverpod', 'GetX', 'SetState'],
    },
    {
      category: 'Firebase',
      skills: [
        'Authentication',
        'Firestore',
        'Cloud Functions',
        'Push Notifications',
        'Analytics',
      ],
    },
    {
      category: 'Flutter Animations',
      skills: [
        'Implicit Animations',
        'Explicit Animations',
        'Animation Controllers',
        'Tween Animations',
        'Custom Animations',
      ],
    },
    {
      category: 'Testing',
      skills: [
        'Unit Testing',
        'Widget Testing',
        'Integration Testing',
        'Mocking',
        'Debugging',
      ],
    },
  ],

  MERN: [
    {
      category: 'Typescript',
      skills: [
        'Types',
        'OOP',
        'Interface',
        'Typecast',
        'Abstract Class',
        'Simple Class',
      ],
    },
    {
      category: 'Javascript',
      skills: ['ES5', 'ES6', 'DOM', 'Events', 'Functional Programming'],
    },
    {
      category: 'MongoDB',
      skills: [
        'CRUD Operations',
        'Aggregation',
        'Indexes',
        'Replication',
        'Sharding',
      ],
    },
    {
      category: 'Express.js',
      skills: [
        'Middleware',
        'Routing',
        'Error Handling',
        'Authentication',
        'Validation',
      ],
    },
    {
      category: 'React',
      skills: [
        'Components',
        'Hooks',
        'State Management',
        'Context API',
        'Lifecycle Methods',
      ],
    },
    {
      category: 'Node.js',
      skills: [
        'Modules',
        'Async Programming',
        'File System',
        'Streams',
        'Event Loop',
      ],
    },
  ],

  DEVOPS: [
    {
      category: 'CI/CD',
      skills: [
        'Jenkins',
        'GitHub Actions',
        'Travis CI',
        'CircleCI',
        'GitLab CI',
      ],
    },
    {
      category: 'Containerization',
      skills: [
        'Docker',
        'Kubernetes',
        'Docker Compose',
        'Helm',
        'Container Orchestration',
      ],
    },
    {
      category: 'Cloud Services',
      skills: [
        'AWS',
        'Azure',
        'Google Cloud',
        'Serverless',
        'Infrastructure as Code (IaC)',
      ],
    },
    {
      category: 'Monitoring & Logging',
      skills: ['Prometheus', 'Grafana', 'ELK Stack', 'Splunk', 'CloudWatch'],
    },
    {
      category: 'Configuration Management',
      skills: ['Ansible', 'Puppet', 'Chef', 'Terraform', 'SaltStack'],
    },
    {
      category: 'Networking',
      skills: ['TCP/IP', 'DNS', 'Load Balancing', 'VPN', 'Firewalls'],
    },
  ],

  QA: [
    {
      category: 'Manual Testing',
      skills: [
        'Test Case Creation',
        'Test Planning',
        'Exploratory Testing',
        'Regression Testing',
        'Defect Tracking',
      ],
    },
    {
      category: 'Automated Testing',
      skills: ['Selenium', 'Cypress', 'JUnit', 'TestNG', 'Postman'],
    },
    {
      category: 'Performance Testing',
      skills: [
        'JMeter',
        'LoadRunner',
        'Stress Testing',
        'Spike Testing',
        'Scalability Testing',
      ],
    },
    {
      category: 'Security Testing',
      skills: [
        'OWASP',
        'Penetration Testing',
        'Vulnerability Assessment',
        'Static Code Analysis',
        'Dynamic Code Analysis',
      ],
    },
    {
      category: 'API Testing',
      skills: [
        'Postman',
        'REST Assured',
        'Swagger',
        'SoapUI',
        'API Automation',
      ],
    },
    {
      category: 'Mobile Testing',
      skills: [
        'Appium',
        'Espresso',
        'XCUITest',
        'Mobile Device Cloud',
        'Mobile Automation',
      ],
    },
  ],

  UIUX: [
    {
      category: 'Design Tools',
      skills: ['Adobe XD', 'Sketch', 'Figma', 'InVision', 'Adobe Photoshop'],
    },
    {
      category: 'Prototyping',
      skills: [
        'Wireframing',
        'Interactive Prototypes',
        'User Flows',
        'High-fidelity Prototypes',
        'Clickable Prototypes',
      ],
    },
    {
      category: 'User Research',
      skills: [
        'User Interviews',
        'Surveys',
        'Usability Testing',
        'Persona Development',
        'A/B Testing',
      ],
    },
    {
      category: 'Visual Design',
      skills: [
        'Typography',
        'Color Theory',
        'Layout Design',
        'Iconography',
        'Design Systems',
      ],
    },
    {
      category: 'Interaction Design',
      skills: [
        'Animation',
        'Micro-interactions',
        'Responsive Design',
        'Gestures',
        'User Interface Patterns',
      ],
    },
    {
      category: 'Accessibility',
      skills: [
        'WCAG Guidelines',
        'Screen Readers',
        'Keyboard Navigation',
        'Color Contrast',
        'Inclusive Design',
      ],
    },
  ],
};

export const getSkillsByDepartment = (department, userId) => {
  return primarySkills[department]
    .map((skillParent) => {
      return skillParent.skills.map((skill) => {
        return {
          category: skillParent.category,
          skill,
          stype: EType.PRIMARY,
          level: ELevel.BEGINNER,
          status: EStatus.APPROVED,
          user: userId,
        };
      });
    })
    .flat();
};
